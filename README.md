This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.




```
Note
├─ .gitignore
├─ .prettierrc
├─ app
│  ├─ api
│  │  ├─ categories
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ hello
│  │  │  └─ route.ts
│  │  ├─ tasks
│  │  │  ├─ route.ts
│  │  │  ├─ [categoryId]
│  │  │  │  └─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ user
│  │  │  └─ route.ts
│  │  └─ webhooks
│  │     └─ clerk
│  │        └─ route.ts
│  ├─ checklist
│  │  ├─ page.tsx
│  │  └─ _components
│  │     ├─ categories.tsx
│  │     ├─ elements
│  │     │  ├─ categoryCard.tsx
│  │     │  ├─ categoryDialog.tsx
│  │     │  ├─ taskCard.tsx
│  │     │  └─ taskDialog.tsx
│  │     └─ tasks.tsx
│  ├─ dashboard
│  │  ├─ page.tsx
│  │  └─ _components
│  │     ├─ calendar.tsx
│  │     ├─ pomodoroSamary.tsx
│  │     └─ todayTodos.tsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ pomodoro
│  │  └─ page.tsx
│  ├─ sign-in
│  │  └─ [[...sign-in]]
│  │     └─ page.tsx
│  ├─ sign-up
│  │  └─ [[...sign-up]]
│  │     └─ page.tsx
│  ├─ store
│  │  ├─ useAuthStore.ts
│  │  ├─ useCategoryStore.ts
│  │  ├─ usePomoStore.ts
│  │  └─ useTaskStore.ts
│  ├─ styles
│  │  └─ calendar.css
│  └─ types
│     └─ interfaces
│        ├─ common.interface.ts
│        ├─ pomodoro.interface.ts
│        └─ store.interface.ts
├─ bun.lockb
├─ components
│  ├─ pomoProgressBar.conponent.tsx
│  ├─ sideBar.component.tsx
│  └─ ui
│     ├─ button.tsx
│     ├─ checkbox.tsx
│     ├─ dialog.tsx
│     ├─ dropdown-menu.tsx
│     ├─ input.tsx
│     ├─ label.tsx
│     ├─ resizable.tsx
│     ├─ separator.tsx
│     ├─ sheet.tsx
│     ├─ sidebar.tsx
│     ├─ skeleton.tsx
│     └─ tooltip.tsx
├─ components.json
├─ db
│  └─ schema.ts
├─ eslint.config.mjs
├─ hooks
│  └─ use-mobile.tsx
├─ lib
│  ├─ context
│  │  └─ authProvider.tsx
│  ├─ controllers
│  │  ├─ category.controller.ts
│  │  ├─ task.controller.ts
│  │  └─ user.controller.ts
│  ├─ middlewares
│  │  ├─ authenticateUser.ts
│  │  ├─ errorHandler.ts
│  │  ├─ handleValidationError.ts
│  │  └─ validateOwnership.ts
│  ├─ repositories
│  │  ├─ categoryRepo.ts
│  │  ├─ taskRep.ts
│  │  └─ userRepo.ts
│  ├─ utils.ts
│  └─ validations
│     ├─ errors
│     │  └─ validation.error.ts
│     ├─ schemas
│     │  ├─ category.schema.ts
│     │  └─ task.shema.ts
│     └─ validators
│        ├─ category.validator.ts
│        └─ task.validator.ts
├─ middleware.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ default-avatar-image.jpg
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ tomato-icon.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ tailwind.config.ts
└─ tsconfig.json

```