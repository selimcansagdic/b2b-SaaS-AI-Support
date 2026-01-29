import { CustomizationView } from "@/modules/customization/ui/views/customization-view";
import { PremiumFeatureOverlay } from "@/modules/billing/ui/components/premium-feature-overlay";
import { Protect } from "@clerk/nextjs";
import { FilesView } from "@/modules/files/ui/views/files-view";

const Page = () => {
  return (
    <Protect
      condition={(has) => has({ plan: "pro" })}
      fallback={
        <PremiumFeatureOverlay>
          <CustomizationView />
        </PremiumFeatureOverlay>
      }
    >
      <CustomizationView />
    </Protect>
  );
};

export default Page;
