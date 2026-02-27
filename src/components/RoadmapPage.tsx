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
            A living list of hook ideas specifically focused on ecommerce flows and GraphQL-backed
            experiences. Not every item will ship, but it keeps our learning backlog visible.
          </p>
        </header>

        <section>
          <h3>GraphQL data layer</h3>
          <ul>
            <li>
              <strong>Query lifecycle hooks.</strong> Hooks like <code>useGraphQLQuery</code> for
              product lists and detail pages, with loading/error states, cache hydration, and
              pagination built in.
            </li>
            <li>
              <strong>Mutations with optimistic updates.</strong> A <code>useGraphQLMutation</code>{' '}
              wrapper for cart updates, wishlists, and account edits that can do optimistic UI,
              rollbacks, and field-level error mapping.
            </li>
            <li>
              <strong>GraphQL schema helpers.</strong> Small utilities to help co-locate fragments
              with components and keep hook APIs aligned with our schema (for example,
              product-related fragments).
            </li>
          </ul>
        </section>

        <section>
          <h3>Ecommerce primitives</h3>
          <ul>
            <li>
              <strong>Cart state and operations.</strong> Hooks like <code>useCart</code> and{' '}
              <code>useCartItem</code> that coordinate local state with a GraphQL cart backend,
              handle anonymous vs. logged-in users, and survive page reloads.
            </li>
            <li>
              <strong>Product discovery.</strong> Hooks for search and filtering such as{' '}
              <code>useProductSearch</code> and <code>useFacetedFilters</code>, combining debounced
              input, URL sync, and GraphQL queries for product grids.
            </li>
            <li>
              <strong>Checkout flow helpers.</strong> A set of hooks for multi-step checkout:
              <code>useCheckoutStep</code>, <code>useShippingMethods</code>, and{' '}
              <code>usePaymentIntent</code>, focused on validating user input and coordinating
              GraphQL mutations.
            </li>
          </ul>
        </section>

        <section>
          <h3>Personalization & merchandising</h3>
          <ul>
            <li>
              <strong>Recommendations and recently viewed.</strong> Hooks like{' '}
              <code>useRecommendations</code> and <code>useRecentlyViewed</code> that combine local
              storage with GraphQL recommendations endpoints.
            </li>
            <li>
              <strong>Feature flags and experiments.</strong> A <code>useCommerceFlags</code> hook
              to toggle experiences (e.g., free shipping thresholds, new PDP layouts) while staying
              friendly to SSR and static rendering.
            </li>
            <li>
              <strong>Price and availability.</strong> Hooks for pricing and inventory such as{' '}
              <code>usePriceDisplay</code> and <code>useAvailability</code>, handling regional
              pricing, currency, and “low stock” thresholds.
            </li>
          </ul>
        </section>

        <section>
          <h3>Performance, caching & resilience</h3>
          <ul>
            <li>
              <strong>Client-side caching strategies.</strong> Experiment with normalized caching
              for GraphQL responses and how hooks can expose cache status (stale, fresh, refetching)
              to the UI.
            </li>
            <li>
              <strong>Resilient network behavior.</strong> Patterns for retry, exponential backoff,
              and timeouts in ecommerce flows where “add to cart” or “place order” must be
              rock-solid.
            </li>
            <li>
              <strong>Gradual degradation.</strong> Hooks that let us fall back to lighter GraphQL
              queries or cached views when the network is slow, while still surfacing clear status
              to the user.
            </li>
          </ul>
        </section>

        <section>
          <h3>Tooling & learning tracks</h3>
          <ul>
            <li>
              <strong>End-to-end flows in Storybook or demos.</strong> Small demo flows (browse →
              PDP → cart → checkout) that exercise multiple ecommerce/GraphQL hooks together.
            </li>
            <li>
              <strong>GraphQL schema evolution.</strong> Experiments with how hook APIs should
              change (or stay stable) as the underlying ecommerce schema evolves.
            </li>
            <li>
              <strong>Testing strategy for commerce hooks.</strong> A small set of examples for
              testing GraphQL + ecommerce hooks, including mocking layers and contract tests against
              real schemas.
            </li>
          </ul>
        </section>
      </article>
    </Layout>
  )
}

