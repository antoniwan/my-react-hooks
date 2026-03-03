import type { Theme } from '../hooks/useTheme'
import { Layout } from './Layout'
import { AppHeader } from './AppHeader'

type AppPage = 'hooks' | 'principles' | 'roadmap'

type RoadmapPageProps = {
  theme: Theme
  toggleTheme: () => void
  activePage: AppPage
  onNavigate: (page: AppPage) => void
}

export function RoadmapPage({
  theme,
  toggleTheme,
  activePage,
  onNavigate,
}: RoadmapPageProps) {
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
          <h2>Hooks roadmap</h2>
          <p>
            A living list of hook ideas I want to build to get better at React.
            Some are tiny and obvious, some are bigger projects. This is a menu
            to pull from whenever it is time to practice.
          </p>
        </header>

        <section>
          <h3>Fundamental hooks to build first</h3>
          <ul>
            <li>
              <strong>State basics.</strong>{' '}
              <del>
                <code>useToggle</code>, <code>useCounter</code>, <code>useInput</code>
              </del>{' '}
              for plain local state and controlled inputs.
            </li>
            <li>
              <strong>Time-based hooks.</strong> <code>useTimeout</code> and{' '}
              <code>useInterval</code> to manage timers without leaks.
            </li>
            <li>
              <strong>Lifecycle-ish hooks.</strong> <code>useIsMounted</code>,{' '}
              <del>
                <code>usePrevious</code>
              </del>
              , and a simple <code>useLogger</code> to understand effects, refs,
              and cleanup.
            </li>
          </ul>
        </section>

        <section>
          <h3>UI & interaction hooks</h3>
          <ul>
            <li>
              <strong>Pointer and focus.</strong> <code>useHover</code>,{' '}
              <code>useFocusTrap</code>, <code>useClickOutside</code> for menus,
              dialogs, and tooltips.
            </li>
            <li>
              <strong>Responsive behavior.</strong> <code>useMediaQuery</code>{' '}
              and <code>usePrefersColorScheme</code> to adapt layouts and
              themes.
            </li>
            <li>
              <strong>Input smoothing.</strong> <code>useDebouncedValue</code>{' '}
              and <code>useThrottledValue</code> for search boxes and scroll
              handlers.
            </li>
          </ul>
        </section>

        <section>
          <h3>Async & data fetching (generic)</h3>
          <ul>
            <li>
              <strong>Simple fetch.</strong> <code>useFetch</code> that wraps{' '}
              <code>fetch</code> with loading, error, and retry.
            </li>
            <li>
              <strong>Generic async.</strong> <code>useAsync</code> that can run
              any promise and expose status, value, and error.
            </li>
            <li>
              <strong>Lists and pagination.</strong> <code>usePaginatedList</code>{' '}
              and <code>useInfiniteScroll</code> for list views that load more
              data over time.
            </li>
            <li>
              <strong>Real-time-ish.</strong> <code>useWebSocket</code> or{' '}
              <code>useEventSource</code> for live updates.
            </li>
          </ul>
        </section>

        <section>
          <h3>Forms & validation</h3>
          <ul>
            <li>
              <strong>Form state.</strong> <code>useForm</code> and{' '}
              <code>useField</code> to manage values, touched state, and errors.
            </li>
            <li>
              <strong>Validation.</strong> <code>useValidation</code> or a{' '}
              <code>useZodForm</code>-style hook to plug in schema validation.
            </li>
            <li>
              <strong>Submission.</strong> <code>useFormSubmit</code> to handle
              pending states, success messages, and failure cases.
            </li>
          </ul>
        </section>

        <section>
          <h3>State persistence & caching</h3>
          <ul>
            <li>
              <strong>Client storage.</strong>{' '}
              <del>
                <code>useLocalStorage</code>
              </del>{' '}
              and <code>useSessionStorage</code> to persist user preferences.
            </li>
            <li>
              <strong>Simple cache.</strong> A <code>useQueryCache</code> style
              hook for caching responses by key, showing stale vs. fresh data.
            </li>
            <li>
              <strong>Sync across tabs.</strong> <code>useBroadcastChannel</code>{' '}
              or <code>useStorageSync</code> to keep state aligned across
              multiple tabs.
            </li>
          </ul>
        </section>

        <section>
          <h3>GraphQL & ecommerce track (later)</h3>
          <p>
            These are more advanced hooks that lean on GraphQL and ecommerce
            flows. They stay on the roadmap as a separate track for when the
            fundamentals feel solid.
          </p>

          <section>
            <h4>GraphQL data layer</h4>
            <ul>
              <li>
                <strong>Query lifecycle hooks.</strong> Hooks like{' '}
                <code>useGraphQLQuery</code> for product lists and detail pages,
                with loading/error states, cache hydration, and pagination.
              </li>
              <li>
                <strong>Mutations with optimistic updates.</strong>{' '}
                <code>useGraphQLMutation</code> for cart updates, wishlists, and
                account edits that support optimistic UI, rollbacks, and
                field-level error mapping.
              </li>
              <li>
                <strong>GraphQL schema helpers.</strong> Small utilities to
                co-locate fragments with components and keep hook APIs aligned
                with the schema (for example, product-related fragments).
              </li>
            </ul>
          </section>

          <section>
            <h4>Ecommerce primitives</h4>
            <ul>
              <li>
                <strong>Cart state and operations.</strong> Hooks like{' '}
                <code>useCart</code> and <code>useCartItem</code> that
                coordinate local state with a GraphQL cart backend, handle
                anonymous vs. logged-in users, and survive page reloads.
              </li>
              <li>
                <strong>Product discovery.</strong> Hooks for search and
                filtering such as <code>useProductSearch</code> and{' '}
                <code>useFacetedFilters</code>, combining debounced input, URL
                sync, and GraphQL queries for product grids.
              </li>
              <li>
                <strong>Checkout flow helpers.</strong> Hooks like{' '}
                <code>useCheckoutStep</code>, <code>useShippingMethods</code>,
                and <code>usePaymentIntent</code> for multi-step checkout, with
                input validation and GraphQL mutations.
              </li>
            </ul>
          </section>

          <section>
            <h4>Personalization & merchandising</h4>
            <ul>
              <li>
                <strong>Recommendations and recently viewed.</strong> Hooks like{' '}
                <code>useRecommendations</code> and{' '}
                <code>useRecentlyViewed</code> that combine local storage with
                GraphQL recommendations endpoints.
              </li>
              <li>
                <strong>Feature flags and experiments.</strong>{' '}
                <code>useCommerceFlags</code> to toggle experiences (for
                example, free shipping thresholds or new PDP layouts) while
                staying friendly to SSR and static rendering.
              </li>
              <li>
                <strong>Price and availability.</strong> Hooks such as{' '}
                <code>usePriceDisplay</code> and <code>useAvailability</code>,
                handling regional pricing, currency, and “low stock”
                thresholds.
              </li>
            </ul>
          </section>

          <section>
            <h4>Performance, caching & resilience</h4>
            <ul>
              <li>
                <strong>Client-side caching strategies.</strong> Experiments with
                normalized caching for GraphQL responses and exposing cache
                status (stale, fresh, refetching) to the UI.
              </li>
              <li>
                <strong>Resilient network behavior.</strong> Patterns for retry,
                exponential backoff, and timeouts in flows where “add to cart”
                or “place order” must be solid.
              </li>
              <li>
                <strong>Gradual degradation.</strong> Hooks that fall back to
                lighter GraphQL queries or cached views when the network is
                slow, while still surfacing clear status to the user.
              </li>
            </ul>
          </section>

          <section>
            <h4>Hard mode experiments</h4>
            <ul>
              <li>
                <strong>Infinite product lists with cursor pagination.</strong>{' '}
                <code>useInfiniteProducts</code> managing GraphQL cursor-based
                pagination, merging pages, preventing duplicates, and handling
                “load more” vs. infinite scroll.
              </li>
              <li>
                <strong>Optimistic queues for mutations.</strong>{' '}
                <code>useOptimisticQueue</code> to batch cart or wishlist
                mutations, retry failed items, and reconcile with the server
                when the user jumps between devices or tabs.
              </li>
              <li>
                <strong>Real-time order tracking.</strong> Hooks like{' '}
                <code>useOrderStatus</code> combining GraphQL subscriptions,
                polling fallbacks, and local cache updates for order timelines.
              </li>
              <li>
                <strong>Offline-first cart and checkout.</strong>{' '}
                <code>useOfflineCartSync</code> that lets users add to cart and
                begin checkout while offline, then syncs via GraphQL when
                connectivity returns, handling conflicts and duplicates.
              </li>
              <li>
                <strong>Security- and compliance-aware flows.</strong> Hooks
                such as <code>usePaymentSecurity</code> or{' '}
                <code>useAddressValidation</code> that coordinate external
                PCI-compliant payment UIs or address validation services while
                keeping React code clean.
              </li>
            </ul>
          </section>
        </section>
      </article>
    </Layout>
  )
}
