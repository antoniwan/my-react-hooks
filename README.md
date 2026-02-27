## my-react-hooks

This project is a small collection of React hooks with a simple UI for exploring them. It uses React, TypeScript, and Vite.

### Hooks included

- **State and utilities**
  - `useCounter`: numeric state with increment, decrement, reset, and optional bounds.
  - `useToggle`: boolean state with helpers for toggling, forcing on, and forcing off.
  - `usePrevious`: track the previous value of a prop or piece of state.
  - `useLocalStorage`: state that is mirrored into `localStorage` under a given key.

- **Browser and environment**
  - `useTheme`: light/dark theme state stored in `localStorage` and applied to the document.
  - `useScrollDirection`: detect scroll direction and whether the page is at the top or bottom.
  - `useSiteMeta`: expose build‑time site metadata (version and repository URL).

- **Context and aggregates**
  - `useUserContext`: aggregate of geo, weather, language, device, session count, and time of day, available directly or through a context provider.

The sidebar groups hooks by these categories and uses an accordion that keeps only one section open at a time. The last open section is remembered across reloads.

### Running the project

Use your preferred package manager (for example `pnpm`, `npm`, or `yarn`).

- **Install dependencies**

  ```bash
  pnpm install
  ```

- **Start the dev server**

  ```bash
  pnpm dev
  ```

- **Build for production**

  ```bash
  pnpm build
  ```

- **Preview the production build**

  ```bash
  pnpm preview
  ```

If you use `npm` or `yarn`, replace `pnpm` with your chosen tool.

### Linting and formatting

The project uses the ESLint flat config and Prettier.

- **Lint**

  ```bash
  pnpm lint
  ```

- **Lint with fixes**

  ```bash
  pnpm lint:fix
  ```

- **Format with Prettier**

  ```bash
  pnpm format
  ```

- **Check formatting**

  ```bash
  pnpm format:check
  ```

### Environment variables

Some hooks use optional environment configuration. See `.env.example` for the available variables. If you do not provide them, the related features either stay disabled or fall back to safe defaults.

### Approach and principles

For a short description of how the hooks are structured and why certain choices were made, see [PRINCIPLES.md](./PRINCIPLES.md).
