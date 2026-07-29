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
- App components: src/components/
- Imports use `@/` path alias mapped to `./src/*`
- Server entry: dist/server/server.js (production)
- Uses srvx as the production server runtime

## Architecture & Patterns

- **Routes own data** — server functions and `beforeLoad` guards live in route files. Components receive data as props, not fetch themselves.
- **Auth guards** — use `createServerFn` + `auth()` from `@clerk/tanstack-react-start/server` in the route's `beforeLoad`. Redirect unauthenticated/unauthorized users with `redirect()`.
- **Layout composition** — parent routes provide layout shell (sidebar, headers); child routes render content via `<Outlet />`.
- **Components are pure** — no data fetching. Logic lives in hooks or server functions passed down from routes.
- **Clerk components** — import from `@clerk/tanstack-react-start` (not `@clerk/react` or `@clerk/nextjs`). The `@clerk/themes` package provides `shadcn` theme for CSS-variable-based dark/light adaptation.
- **Sidebar** — uses shadcn/ui `sidebar.tsx` primitives. `SidebarProvider` wraps the layout, `SidebarInset` wraps the main content area.

## Code Preferences

- Prefer simple, flat component structures over deeply nested abstractions.
- Use `useMemo`/`useCallback` sparingly — only for actual performance regressions.
- Colocate related logic (e.g., server fn + route definition in the same file).
- Avoid premature optimization; write for clarity first.
- Tailwind v4: use `@theme inline` CSS variables for theming. Avoid hardcoded color values unless it's a deliberate design choice (e.g., `bg-[#1B1B1B]` on the dashboard).
- CSS custom properties go in `src/styles.css` under `:root` / `.dark`.
- Sidebar colors are mapped through `--sidebar`, `--sidebar-foreground`, `--sidebar-accent`, etc.

## Deployment

- Hosted on Railway
- Build: vite build
- Start: srvx serve --entry ./dist/server/server.js --dir . --static ./dist/client --prod

<!-- TRIGGER.DEV SKILLS START -->
## Trigger.dev agent skills

This project has Trigger.dev agent skills installed in `.agents/skills/`. Before writing or changing Trigger.dev code (background tasks, scheduled tasks, realtime, or chat.agent AI agents), load the most relevant skill: `trigger-authoring-chat-agent`.
<!-- TRIGGER.DEV SKILLS END -->
