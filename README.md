# Echo Support Platform

Echo is a **production-ready customer support platform** featuring an **embeddable chat widget** for modern web applications.

It allows teams to manage customer conversations through a dashboard while providing a lightweight widget that can be embedded into any website using a single `<script>` tag.

The project is built with a **scalable monorepo architecture** and focuses on real-world deployment, performance, and developer experience.

## 🚀 Live Demo

Deployed on **Vercel** (Dashboard + Embed Script running in production).

## ✨ Features

- 🧩 **Embeddable Chat Widget**
  - Single script integration
  - Iframe-based isolation
  - Bottom-left / bottom-right positioning
  - Organization-based configuration

- 🏢 **Multi-Organization Support**
  - Separate conversations per organization
  - Dedicated widget per organization

- 💬 **Conversation Dashboard**
  - Conversation listing
  - Status management (`resolved`, `unresolved`, `escalated`)
  - Responsive and clean UI

- 🎨 **Widget Customization**
  - Position control
  - Runtime configuration via global API

- ⚡ **Monorepo Architecture**
  - Turborepo + pnpm workspaces
  - Shared packages
  - Fast incremental builds

- ☁️ **Production Ready**<img width="1680" height="1050" alt="Ekran Resmi 2026-01-31 04 59 42" src="https://github.com/user-attachments/assets/52ad2cd8-ed13-44d2-a0bf-7a2db158c8a6" />

  - Vercel deployment
  - Edge & server rendering
  - Environment-aware builds

## 🧱 Tech Stack

- Next.js 15
- React 19
- TypeScript
- Turborepo
- pnpm
- Convex
- Tailwind CSS
- Clerk Authentication
- Sentry

## 📂 Project Structure

```text
apps/
  web/          # Dashboard application
  embed/        # Embeddable widget script

packages/
  ui/           # Shared UI components
  math/         # Utility helpers
  backend/      # Backend logic (Convex)


🚀 Deployment

The project is deployed on Vercel using:

Turborepo build pipeline

pnpm workspace support<img width="1664" height="999" alt="Ekran Resmi 2026-01-31 05 01 31" src="https://github.com/user-attachments/assets/6dc1b487-77ff-4d0e-a26a-c13825cb8a26" />
<img width="1668" height="960" alt="Ekran Resmi 2026-01-31 05 04 55" src="https://github.com/user-attachments/assets/5a636b1a-f6cf-4431-b2c9-d6f17a59aea1" />
<img width="1665" height="959" alt="Ekran Resmi 2026-01-31 05 03 37" src="https://github.com/user-attachments/assets/5ec17cae-5433-44fd-9d94-fc1f856d442c" />


Optimized production builds

CI/CD-friendly configuration

🎯 Purpose

This project was built to:

Practice real-world monorepo architecture

Design and ship an embeddable JavaScript widget

Work with modern Next.js (App Router + Edge)

Handle production deployments and CI/CD

Build a SaaS-like, production-ready application
