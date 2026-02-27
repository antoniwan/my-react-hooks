# Approach and principles

This project is a small set of example hooks. The goal is to keep the code clear enough to read in one sitting, while still showing realistic patterns you can reuse.

## General goals

- **Prefer clarity over cleverness**  
  Code is written in a straightforward way, even when a shorter version exists.

- **Keep each hook focused**  
  Each hook solves one clear problem. More complex hooks compose smaller ones instead of doing everything inline.

- **Work well in real apps**  
  Hooks handle common edge cases (SSR, browser APIs, dev StrictMode) so they behave in the way you would expect in production.

## Hook design principles

- **Small primitives first**  
  Hooks like `useCounter`, `useToggle`, `usePrevious`, and `useLocalStorage` are basic building blocks. They aim for simple, predictable behavior and small APIs.

- **Composition for more complex behavior**  
  `useUserContext` composes several smaller concerns (time of day, language, device, geo, weather, session). It keeps the aggregation logic in `useUserContextInternal` and exposes a context-based API on top, instead of one large mixed hook.

- **Context as an optional layer**  
  `useUserContext` can read from a provider if one is present, or fall back to running the internal hook directly. This makes it useful both inside and outside a provider tree, and keeps the public API small.

- **Flat exports, internal structure**  
  Files like `src/hooks/useUserContext/index.ts` act as the public surface. Internal files (`internal.ts`, `context.tsx`) are free to change structure as long as the index re-exports the same types and functions. This mirrors how larger libraries isolate their public API from implementation details.

## Handling browser APIs and side effects

- **Guard against non‑browser environments**  
  Hooks that use `window`, `document`, or `navigator` check for their presence first. This avoids crashes under SSR or during static builds.

- **Be explicit about persistence**
  - `useLocalStorage` is the generic hook for “state mirrored into `localStorage`”. It is used where the only job is to persist simple state (for example, the open section in the hook explorer).
  - Hooks with extra domain behavior, like `useTheme`, are allowed to talk to `localStorage` directly so they can also read system preferences and update the DOM attribute without hiding work inside a generic helper.

- **Account for React StrictMode behavior**  
  The session counter inside `useUserContext` is written to avoid double‑incrementing when React dev mode runs effects twice on mount. It uses an extra key (`user_session_last_page_load_id`) so each real page load only increments once.

- **Cache external calls when reasonable**  
  Geo and weather requests are cached in module‑level variables. This keeps the example fast and avoids re‑fetching data on every render, while still keeping the logic simple enough to follow.

## UI and UX for demos

- **Show behavior, not just data**  
  Demos surface loading states, errors, and derived summaries (for example, the `useUserContext` summary text and pills), so it is clear how the hook behaves over time, not only what values it returns when everything works.

- **Group hooks by intent**  
  The explorer lists hooks by category (state/utilities, browser/environment, context/aggregates) and uses a single‑open accordion. This matches how you might think about choosing a hook in a real project.

- **Persist small UI preferences**  
  The currently open accordion section is stored via `useLocalStorage`, so the UI remembers where you left off across reloads. This is a small, concrete example of using hooks to manage UX details without adding a state management library.
