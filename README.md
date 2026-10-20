# Frontend Mentor - Todo app solution

Solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [Current state](#current-state)
- [Architecture](#architecture)
  - [Feature-Sliced Design](#feature-sliced-design)
  - [Hexagonal architecture (ports & adapters)](#hexagonal-architecture-ports--adapters)
  - [Error handling](#error-handling)
- [Stack](#stack)
- [Getting started](#getting-started)
- [My process](#my-process)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- Drag and drop to reorder items on the list

### Screenshot

![](./public/preview%20Vite%20React%20TS.png)

### Links

- Solution URL: [the source code](https://github.com/duquerson/todoList)
- Live Site URL: [the live site](https://full-todo-list.netlify.app/)

## Current state

The demo is a **pure front-end application**: the tasks live in the browser's `localStorage`.

- ✅ No backend is required, so there is no endpoint that can fail with HTTP 500.
- ✅ The first version of this project persisted the tasks in Supabase through a Netlify Function
  (`/.netlify/functions/setTodos`). That function depended on the `VITE_URL` and `VITE_SERVICE_ROL`
  environment variables and the `TODOS` table; when they were missing or misconfigured the app
  rendered an error instead of the list. That dependency was removed.
- ✅ Adding, deleting, completing, clearing and reordering tasks update the interface optimistically.
  If the write fails, the previous state is restored and an error is shown.
- ✅ Load errors explain what happened and offer a **Retry** button.

## Architecture

### Feature-Sliced Design

The source code is organized in layers, where each layer can only import from the layers below it
(`app → pages → widgets → features → entities → shared`).

```
src/
├── app/                          # Bootstrap: providers, entry point, global styles
│   ├── providers/AppProvider.tsx # Composes the app and injects the storage adapter
│   ├── App.tsx
│   ├── main.tsx
│   ├── styles/index.css
│   └── tests/App.test.tsx
├── pages/
│   └── TodoPage/                 # Page composition only
├── widgets/                      # Reusable UI blocks
│   ├── Header/
│   ├── TodoList/
│   ├── TodoActions/
│   └── Footer/
├── features/                     # User-facing capabilities
│   ├── todo-crud/                # Create, delete, complete and clear (optimistic + rollback)
│   ├── todo-reorder/             # Drag and drop
│   └── todo-filter/              # Filters, synced with the URL (?filter=)
├── entities/
│   └── todo/
│       ├── model/                # Domain: types, schema, service, reducer, port, adapter
│       └── ui/                   # TodoItem
└── shared/                       # Reusable infrastructure
    ├── lib/                      # cn, uuid, error helpers
    ├── model/                    # Theme
    └── ui/                       # Layout, ErrorBanner, Loader
```

Aliases are configured in `tsconfig.json` and `vite.config.ts`: `@app/*`, `@pages/*`, `@widgets/*`,
`@features/*`, `@entities/*` and `@shared/*`.

### Hexagonal architecture (ports & adapters)

The persistence dependency is isolated behind a **port**, so the business logic never talks to a
concrete technology:

```
TodoRepository (port)          ← entities/todo/model/TodoRepository.ts
        ▲
        │ implements
        │
LocalStorageTodoAdapter        ← entities/todo/model/localStorageTodoAdapter.ts (adapter)
```

`TodoService` (domain service) depends only on the port, and `AppProvider` injects the concrete
adapter:

```ts
const service = useMemo(() => createTodoService(new LocalStorageTodoAdapter()), []);
```

Replacing `localStorage` with an API, a database or another storage means writing a new adapter
that implements `TodoRepository` and changing that single line — no changes in the reducer, the
features or the UI.

### Error handling

| Situation | Behaviour |
| --- | --- |
| Stored data is corrupted or has an unexpected format | The load fails with a contextual message and a **Retry** button. |
| A write fails (quota exceeded, storage blocked, etc.) | The optimistic change is rolled back (`SET_TODOS` restores the previous state) and a dismissible error is displayed. |
| The description is empty or too long | It is rejected by the Zod schema before touching the UI. |

## Stack

- React 18 + TypeScript 5.9
- Vite 5.4
- [dnd-kit](https://dndkit.com/) for drag and drop
- [Zod](https://zod.dev/) for schema validation
- Tailwind CSS 3.4
- Vitest for unit and integration tests

## Getting started

```bash
pnpm install     # install dependencies
pnpm dev         # start the dev server
pnpm build       # typecheck (tsc) and build for production
pnpm preview     # preview the production build
pnpm lint        # ESLint
pnpm test        # unit + integration tests
```

The app needs no configuration, no environment variables and no secrets: the data is stored in the
browser under the `TODOS` key.

## My process

### What I learned

Through this project, I gained a comprehensive understanding of state management, learning how to
structure and update application state effectively and how to implement strategies to keep data
consistent across components. I also learned how to isolate infrastructure behind ports and
adapters so that the business logic does not depend on a concrete technology, and how to reconcile
optimistic updates with the real state of the server by rolling back when a write fails.

## Author

- GitHub - [Duquerson](https://github.com/duquerson)
- Frontend Mentor - [Duquerson](https://www.frontendmentor.io/profile/yeyosoto)

## Connect with me

<p align="left">
<a href="https://linkedin.com/in/duquerson" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="www.linkedin.com/in/duquerson" height="60" width="70" /></a>
</p>
