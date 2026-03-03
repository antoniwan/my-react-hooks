import type { Theme } from '../hooks/useTheme'
import { Layout } from './Layout'
import { AppHeader } from './AppHeader'

type AppPage = 'hooks' | 'principles' | 'roadmap'

type PrinciplesPageProps = {
  theme: Theme
  toggleTheme: () => void
  activePage: AppPage
  onNavigate: (page: AppPage) => void
}

export function PrinciplesPage({
  theme,
  toggleTheme,
  activePage,
  onNavigate,
}: PrinciplesPageProps) {
  return (
    <Layout
      header={
        <AppHeader
          theme={theme}
          toggleTheme={toggleTheme}
          activePage={activePage}
          onNavigate={onNavigate}
        />
      }
    >
      <article className="page-content">
        <header className="page-header">
          <h2>Approach and principles</h2>
          <p>
            This is my small playground of example hooks and other web things.
            I try to keep the code clear enough to read in one sitting, while
            still showing realistic patterns you can reuse.
          </p>
        </header>

        <section>
          <h3>General goals</h3>
          <ul>
            <li>
              <strong>Prefer clarity over cleverness.</strong> Code is written
              in a straightforward way, even when a shorter version exists.
            </li>
            <li>
              <strong>Keep each hook focused.</strong> Each hook solves one
              clear problem. More complex hooks compose smaller ones instead of
              doing everything inline.
            </li>
            <li>
              <strong>Work well in real apps.</strong> Hooks handle common edge
              cases (SSR, browser APIs, dev StrictMode) so they behave in the
              way you would expect in production.
            </li>
          </ul>
        </section>

        <section>
          <h3>Hook design principles</h3>
          <ul>
            <li>
              <strong>Small primitives first.</strong> Hooks like{' '}
              <code>useCounter</code>, <code>useToggle</code>,{' '}
              <code>usePrevious</code>, and <code>useLocalStorage</code> are
              basic building blocks. They aim for simple, predictable behavior
              and small APIs.
            </li>
            <li>
              <strong>Composition for more complex behavior.</strong>{' '}
              <code>useUserContext</code> composes several smaller concerns
              (time of day, language, device, geo, weather, session). It keeps
              the aggregation logic in <code>useUserContextInternal</code> and
              exposes a context-based API on top, instead of one large mixed
              hook.
            </li>
            <li>
              <strong>Context as an optional layer.</strong>{' '}
              <code>useUserContext</code> can read from a provider if one is
              present, or fall back to running the internal hook directly. This
              makes it useful both inside and outside a provider tree, and keeps
              the public API small.
            </li>
            <li>
              <strong>Flat exports, internal structure.</strong> Files like{' '}
              <code>src/hooks/useUserContext/index.ts</code> act as the public
              surface. Internal files (<code>internal.ts</code>,{' '}
              <code>context.tsx</code>) are free to change structure as long as
              the index re-exports the same types and functions. This mirrors
              how larger libraries isolate their public API from implementation
              details.
            </li>
          </ul>
        </section>

        <section>
          <h3>Handling browser APIs and side effects</h3>
          <ul>
            <li>
              <strong>Guard against non-browser environments.</strong> Hooks
              that use <code>window</code>, <code>document</code>, or{' '}
              <code>navigator</code> check for their presence first. This avoids
              crashes under SSR or during static builds.
            </li>
            <li>
              <strong>Be explicit about persistence.</strong>
              <ul>
                <li>
                  <code>useLocalStorage</code> is the generic hook for “state
                  mirrored into <code>localStorage</code>”. It is used where the
                  only job is to persist simple state (for example, the open
                  section in the hook explorer).
                </li>
                <li>
                  Hooks with extra domain behavior, like <code>useTheme</code>,
                  are allowed to talk to <code>localStorage</code> directly so
                  they can also read system preferences and update the DOM
                  attribute without hiding work inside a generic helper.
                </li>
              </ul>
            </li>
            <li>
              <strong>Account for React StrictMode behavior.</strong> The
              session counter inside <code>useUserContext</code> is written to
              avoid double-incrementing when React dev mode runs effects twice
              on mount. It uses an extra key (
              <code>user_session_last_page_load_id</code>) so each real page
              load only increments once.
            </li>
            <li>
              <strong>Cache external calls when reasonable.</strong> Geo and
              weather requests are cached in module-level variables. This keeps
              the example fast and avoids re-fetching data on every render,
              while still keeping the logic simple enough to follow.
            </li>
          </ul>
        </section>

        <section>
          <h3>UI and UX for demos</h3>
          <ul>
            <li>
              <strong>Show behavior, not just data.</strong> Demos surface
              loading states, errors, and derived summaries (for example, the{' '}
              <code>useUserContext</code> summary text and pills), so it is
              clear how the hook behaves over time, not only what values it
              returns when everything works.
            </li>
            <li>
              <strong>Group hooks by intent.</strong> The explorer lists hooks
              by category (state/utilities, browser/environment,
              context/aggregates) and uses a single-open accordion. This matches
              how you might think about choosing a hook in a real project.
            </li>
            <li>
              <strong>Persist small UI preferences.</strong> The currently open
              accordion section is stored via <code>useLocalStorage</code>, so
              the UI remembers where you left off across reloads. This is a
              small, concrete example of using hooks to manage UX details
              without adding a state management library.
            </li>
          </ul>
        </section>
      </article>
    </Layout>
  )
}
