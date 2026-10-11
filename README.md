# DentaCare · Frontend

Admin panel for dental clinics: patient records, dental chart (odontogram), appointments, treatment plans, billing, inventory, reports, staff, users, and role-based access control.

The UI is available in three languages, **Russian (ru)**, **Kyrgyz (ky)** and **English (en)**, with light and dark themes.

> **Status:** every screen from the design is implemented and runs on mock data. Wiring to the NestJS backend (`../backend`) is the next step.

---

## Table of contents

- [Screenshots](#screenshots)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Routes](#routes)
- [Project structure](#project-structure)
- [Architecture: Feature-Sliced Design](#architecture-feature-sliced-design)
- [Internationalization](#internationalization)
- [Forms and validation](#forms-and-validation)
- [Conventions](#conventions)
- [Design system](#design-system)

---

## Screenshots

The screenshots are taken from the artboards of the **DentaCare Admin Panel** design file and live in [`public/images/`](public/images).

### Admin panel

| Dashboard | Patients |
| --- | --- |
| ![Dashboard](public/images/desktop/main.png) | ![Patients](public/images/desktop/patients.png) |
| **Patient profile** | **Appointments** |
| ![Patient profile](public/images/desktop/patient-profile.png) | ![Appointments](public/images/desktop/appointments.png) |
| **Treatment plans** | **Billing** |
| ![Treatment plans](public/images/desktop/treatment-plans.png) | ![Billing](public/images/desktop/billing.png) |
| **Inventory** | **Reports** |
| ![Inventory](public/images/desktop/inventory.png) | ![Reports](public/images/desktop/reports.png) |
| **Staff** | **Settings** |
| ![Staff](public/images/desktop/staff.png) | ![Settings](public/images/desktop/settings.png) |
| **My profile** | |
| ![My profile](public/images/desktop/user-profile.png) | |

### Authentication

| Sign in | Register |
| --- | --- |
| ![Sign in](public/images/auth/auth-login.png) | ![Register](public/images/auth/auth-register.png) |
| **Forgot password** | **Sign-in verification (SMS code)** |
| ![Forgot password](public/images/auth/auth-forgot.png) | ![Verification](public/images/auth/auth-verify.png) |
| **New password** | |
| ![New password](public/images/auth/auth-reset.png) | |

### Forms and actions (create, edit, delete)

| Users | New user |
| --- | --- |
| ![Users](public/images/crud/users.png) | ![New user](public/images/crud/user-create.png) |
| **Edit user** | **Roles and access** |
| ![Edit user](public/images/crud/user-edit.png) | ![Roles](public/images/crud/roles.png) |
| **New role** | **Edit role** |
| ![New role](public/images/crud/role-create.png) | ![Edit role](public/images/crud/role-edit.png) |
| **Confirm dialog** | **New appointment** |
| ![Confirm dialog](public/images/crud/confirm-dialog.png) | ![New appointment](public/images/crud/appointments-create.png) |
| **Edit and delete appointment** | **New patient** |
| ![Edit appointment](public/images/crud/appointments-edit.png) | ![New patient](public/images/crud/patients-create.png) |
| **New treatment plan** | **New invoice** |
| ![New treatment plan](public/images/crud/treatment-plans-create.png) | ![New invoice](public/images/crud/billing-create.png) |
| **New inventory item** | **Service settings** |
| ![New inventory item](public/images/crud/inventory-create.png) | ![Service settings](public/images/crud/settings-service.png) |
| **Staff shift** | |
| ![Staff shift](public/images/crud/staff-shift.png) | |

---

## Tech stack

### Core

| Package | Purpose |
| --- | --- |
| [Next.js](https://nextjs.org) 16.4 (App Router) | Framework, routing, Server Components by default |
| [React](https://react.dev) 19.3 | UI library |
| [TypeScript](https://www.typescriptlang.org) 5 | Strict mode, path alias `@/*` → `./src/*` |
| [Bun](https://bun.sh) 1.4 | Package manager and script runner |

### UI and styling

| Package | Purpose |
| --- | --- |
| [Tailwind CSS](https://tailwindcss.com) v4 + `@tailwindcss/turbopack` | Utility-first styling; design tokens in `app/globals.css` |
| [Framer Motion](https://motion.dev) | Animations and transitions |
| [Lucide React](https://lucide.dev) | Icons |
| Custom UI kit (`src/shared/ui`) | Button, Card, Modal, Table, Badge, Switch, Segmented, Toast, ConfirmDialog, PhoneInput, PasswordInput, and more |

### Data and state

| Package | Purpose |
| --- | --- |
| [TanStack Query](https://tanstack.com/query) v5 | Server state, caching, mutations |
| [Axios](https://axios-http.com) | HTTP client instance (`src/shared/api/instance`) |

### Forms and validation

| Package | Purpose |
| --- | --- |
| [React Hook Form](https://react-hook-form.com) | Forms, filters, search and sorting state |
| [Zod](https://zod.dev) v4 | Validation schemas |
| `@hookform/resolvers` | Connects Zod schemas to React Hook Form |

### Internationalization

| Package | Purpose |
| --- | --- |
| [next-intl](https://next-intl.dev) v4 | Translations for ru, ky, en; the locale is stored in a cookie, not in the URL |

### Code quality

| Package | Purpose |
| --- | --- |
| ESLint 9 + `eslint-config-next` | Linting |
| `eslint-plugin-boundaries` | Enforces FSD layer order, cross-slice bans, and public API imports |
| [Steiger](https://github.com/feature-sliced/steiger) + `@feature-sliced/steiger-plugin` | Official Feature-Sliced Design structure linter |
| [Prettier](https://prettier.io) + `@trivago/prettier-plugin-sort-imports` | Formatting and import sorting by FSD layer |
| [Husky](https://typicode.github.io/husky/) | `pre-commit` hook runs `bun run lint`; commits with lint errors are rejected |

---

## Getting started

Requirements: [Bun](https://bun.sh) 1.4+.

```bash
bun install
echo "NEXT_PUBLIC_API_URL=http://localhost:4200/api" > .env.local
bun run dev
```

Open <http://localhost:3000>. The app runs on mock data, so the backend does not need to be running.

### Environment variables

| Variable | Example | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:4200/api` | Base URL of the backend API |

---

## Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start the dev server |
| `bun run build` | Production build |
| `bun run start` | Run the production build |
| `bun run lint` | ESLint (including FSD import rules) + Steiger. Must pass with 0 errors |
| `bun run lint:fix` | Auto-fix what can be fixed |
| `bun run lint:fsd` | Steiger only |
| `bun run format` | Format with Prettier |
| `bun run format:check` | Check formatting |

---

## Routes

| Route | Screen |
| --- | --- |
| `/` | Dashboard: today's schedule, chair load, KPIs |
| `/patients` | Patient list |
| `/patients/[id]` | Patient profile with the dental chart |
| `/appointments` | Appointment calendar: create, edit, delete |
| `/treatment-plans` | Treatment plans |
| `/billing` | Payments and invoices |
| `/inventory` | Inventory |
| `/reports` | Reports |
| `/staff` | Staff and shifts |
| `/users`, `/users/new`, `/users/[id]` | Users: list, create, edit |
| `/roles`, `/roles/new`, `/roles/[id]` | Roles and permissions: list, create, edit |
| `/settings` | Clinic settings and services |
| `/profile` | My profile |
| `/login` | Sign in |
| `/register` | Register |
| `/forgot-password` | Forgot password |
| `/verify` | Sign-in verification |
| `/reset-password` | New password |

---

## Project structure

```
DentaCare/
├── app/                  # Next.js routing only: (admin) and (auth) route groups
├── pages/                # Empty on purpose: stops Next.js from treating src/pages as the Pages Router
├── public/images/        # README screenshots (desktop, auth, crud)
└── src/                  # Feature-Sliced Design layers
    ├── app/              # Providers and layouts
    ├── pages/            # Screens: dashboard, patients, patient-profile, appointments,
    │                     # treatment-plans, billing, inventory, reports, staff, settings,
    │                     # users, user-form, roles, role-form, profile, login, register,
    │                     # forgot-password, verify, reset-password
    ├── widgets/          # admin-sidebar, auth-panel, dental-chart, page-header
    ├── features/         # switch-language
    ├── entities/         # appointment, employee, invoice, patient, role, user
    └── shared/
        ├── api/          # Axios instance, mock request helper
        ├── config/       # Constants, env
        ├── lib/          # i18n, format, date, form, validation, search, cn, error
        ├── routes/       # Route paths
        └── ui/           # UI kit
```

---

## Architecture: Feature-Sliced Design

The project follows [Feature-Sliced Design](https://fsd.how/ru/). Layers from top to bottom:

| Layer | Has slices | May import from |
| --- | --- | --- |
| `app/` (Next.js routing) | no | `@/app`, `@/pages`, `@/shared` |
| `src/app` | no | pages, widgets, features, entities, shared |
| `pages` | yes | widgets, features, entities, shared |
| `widgets` | yes | features, entities, shared |
| `features` | yes | entities, shared |
| `entities` | yes | shared (other entities only via `@x`) |
| `shared` | no | external packages only |

Rules, all enforced by ESLint and Steiger:

1. Imports only go downward, never up.
2. Slices on the same layer do not import each other.
3. Entities reference each other only through `@x` (for example `@/entities/user/@x/notification`).
4. From outside a slice, import only its public API (`index.ts`).
5. `index.ts` re-exports by name; `export *` is forbidden.
6. Inside a slice, use relative imports.
7. Segments are named by purpose (`ui`, `model`, `api`, `lib`, `config`). `components`, `hooks`, `types` and `utils` are not allowed.

Other placement rules:

- Global stores go in `shared/model`, global hooks in `shared/lib`.
- Mock data lives in `entities/*/api/Mock.ts`. Mutations go through `mockRequest()` from `@/shared/api` and will be replaced by real API calls once the backend is connected.
- The `processes` layer is deprecated and is never used.

---

## Internationalization

- Messages: `src/shared/lib/i18n/messages/{ru,ky,en}.json`, with the same key tree in each file.
- Top-level keys are namespaces named after the FSD slice in PascalCase (`Dashboard`, `PatientProfile`), plus `Common` and `Validation`.
- Keys are English camelCase (`t('newAppointment')`), and placeholders use ICU (`t('chairNumber', { n: 2 })`).
- Numbers, amounts, dates and names are formatted with `useFormat()`.
- The language is switched with `useChangeLocale()`, which sets the `denta-locale` cookie.
- To add a language, add it to `LOCALES` and `LOCALE_META` in `shared/lib/i18n/Config.ts` and create `messages/<code>.json`.

---

## Forms and validation

Everything the user fills in, or that becomes a request or query, goes through React Hook Form. That covers create and edit forms, settings, table filters, search, sorting and confirm-dialog reasons.

- The model hook owns the form: `useForm({ resolver: zodResolver(schema), defaultValues })`.
- Field components read the form with `useFormContext()`. Chips, switches and swatches use `Controller`.
- Zod error messages are keys of the `Validation` namespace and are shown with `FormField` or `FieldError`.
- `useState` is used only for pure UI state, such as the open tab, selected rows or the modal target.

---

## Conventions

- Server Components by default. Add `"use client"` only for interactivity, browser APIs or hooks.
- Components are PascalCase (`UserCard.tsx`), hooks are camelCase (`useSidebarNav.ts`), folders and slices are kebab-case.
- Props are typed with `type T<ComponentName>Props` declared above the component.
- Business logic lives in `model/use*.ts` hooks, and components only render. Components stay under about 150 lines.
- Styling uses Tailwind utility classes only, with the canonical class names (`h-180`, not `h-[720px]`).
- Use `next/image` for images, `next/link` for navigation, and paths from `shared/routes`.
- Prettier settings: tabs, single quotes, no semicolons.
- Commit messages follow `type:[branchName][developerName]: description`, for example `feat:[master][Vadim]: add auth`.

---

## Design system

The UI is built on the **Denta** design system, which uses soft "clay" surfaces.

- **Colors:** teal brand `#0A7570` (`#3FD0C3` in dark mode) and coral accent `#AD3D17`. There are success, warning, danger and info status colors, plus dedicated dental chart tokens for healthy, caries, treated, planned and missing teeth.
- **Typography:** Manrope for headings, Golos Text for body text, JetBrains Mono for numbers and IDs.
- **Radius:** 6 / 10 / 14 / 20 / 28 px, plus pill.
- **Shadows:** `clay-sm`, `clay-md`, `float`, `press`, `brand`.
- **Motion:** all animations respect `prefers-reduced-motion`.
