# Browser Automation - Project Guidelines

## Tech Stack

- Framework: TanStack Start (React) v1.168.32
- Styling: Tailwind CSS v4 via @tailwindcss/vite
- Routing: @tanstack/react-router (file-based)
- UI: shadcn/ui with @base-ui/react
- Build: Vite 8, type: module
- Package manager: bun

## Commands

- `bun run dev` - Start dev server on port 3000
- `bun run build` - Production build (outputs to dist/)
- `bun run start` - Start production server (srvx serve)
- `bun run lint` - Lint with ESLint
- `bun run format` - Format with Prettier + ESLint

## Conventions

- Routes: src/routes/ (file-based routing)
- UI components: src/components/ui/
- Imports use #/* path alias mapped to ./src/*
- Server entry: dist/server/server.js (production)
- Uses srvx as the production server runtime

## Deployment

- Hosted on Railway
- Build: vite build
- Start: srvx serve --entry ./dist/server/server.js --dir . --static ./dist/client --prod
