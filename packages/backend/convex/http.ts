import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { createClerkClient } from "@clerk/backend";
import type { WebhookEvent } from "@clerk/backend";
import { internal } from "./_generated/api";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY || "",
});

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      console.log("Clerk webhook headers:", {
        "svix-id": request.headers.get("svix-id"),
        "svix-timestamp": request.headers.get("svix-timestamp"),
        "svix-signature": request.headers.get("svix-signature"),
      });

      const event = await validateRequest(request);
      if (!event) {
        return new Response("Invalid signature", { status: 401 });
      }

      switch (event.type) {
        case "subscription.updated": {
          const subscription = event.data as {
            status: string;
            payer?: {
              organization_id: string;
            };
          };
          const organizationId = subscription.payer?.organization_id;

          if (!organizationId) {
            return new Response("Missing Organization ID", { status: 400 });
          }

          const newMaxAllowedMemberships = subscription.status === "active" ? 5 : 1;

          await clerkClient.organizations.updateOrganization(organizationId, {
            maxAllowedMemberships: newMaxAllowedMemberships,
          });
          await ctx.runMutation(internal.system.subscriptions.upsert, {
            organizationId,
            status: subscription.status,
          });
          break;
        }
        default:
          console.log("Ignored Clerk webhook event:", event.type);
      }
      return new Response("OK", { status: 200 });
    } catch (err) {
      console.error("Error processing Clerk webhook:", err);
      return new Response("Server error", { status: 500 });
    }
  }),
});

async function validateRequest(req: Request): Promise<WebhookEvent | null> {
  const payloadString = await req.text();
  const svixHeaders = {
    "svix-id": req.headers.get("svix-id") || "",
    "svix-timestamp": req.headers.get("svix-timestamp") || "",
    "svix-signature": req.headers.get("svix-signature") || "",
  };

  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    console.error("CLERK_WEBHOOK_SECRET is not set in environment");
  }

  const wh = new Webhook(secret || "");

  try {
    return wh.verify(payloadString, svixHeaders) as unknown as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook event:", {
      error,
      headers: svixHeaders,
      payloadPreview: payloadString ? payloadString.slice(0, 200) : null,
    });
    return null;
  }
}

export default http;
