import { useEffect, useState } from 'react'
import type { Theme } from '../../hooks/useTheme'
import { useAccordion } from '../../hooks/useAccordion'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { Layout } from '../../components/Layout'
import { AppHeader } from '../../components/AppHeader'
import { CounterDemo } from '../../components/CounterDemo'
import { ToggleDemo } from '../../components/ToggleDemo'
import { LocalStorageDemo } from '../../components/LocalStorageDemo'
import { PreviousValueDemo } from '../../components/PreviousValueDemo'
import { ThemeToggleDemo } from '../../components/ThemeToggleDemo'
import { ScrollDirectionDemo } from '../../components/ScrollDirectionDemo'
import { SiteMetaDemo } from '../../components/SiteMetaDemo'
import { ContextSignalDemo } from '../../components/ContextSignalDemo'
import { InputDemo } from '../../components/InputDemo'
import { HOOKS } from './hooksConfig'

type HookExplorerProps = {
  theme: Theme
  toggleTheme: () => void
  activePage: 'hooks' | 'principles' | 'roadmap'
  onNavigate: (page: 'hooks' | 'principles' | 'roadmap') => void
}

export function HookExplorer({
  theme,
  toggleTheme,
  activePage,
  onNavigate,
}: HookExplorerProps) {
  const [selectedHookId, setSelectedHookId] = useState<string>(
    HOOKS[0]?.id ?? 'useCounter',
  )

  const selectedHook =
    HOOKS.find(hook => hook.id === selectedHookId) ?? HOOKS[0]
  const categories = Array.from(
    new Map(HOOKS.map(hook => [hook.category, hook.category])).keys(),
  )

  const { value: storedCategory, setValue: setStoredCategory } =
    useLocalStorage<string | null>(
      'hookExplorer:openCategory',
      categories[0] ?? null,
    )

  const {
    openItem: openCategory,
    isOpen: isCategoryOpen,
    toggle: toggleCategory,
  } = useAccordion(categories, {
    initialItem:
      storedCategory && categories.includes(storedCategory)
        ? storedCategory
        : (categories[0] ?? null),
  })

  useEffect(() => {
    if (!categories.length) return

    if (openCategory && categories.includes(openCategory)) {
      setStoredCategory(openCategory)
    } else {
      setStoredCategory(categories[0] ?? null)
    }
  }, [openCategory, categories, setStoredCategory])

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
      sidebar={
        <nav className="hook-list">
          <h2 className="hook-list-title">Hooks</h2>
          {categories.map(category => {
            const open = isCategoryOpen(category)

            return (
              <section key={category} className="hook-list-section">
                <button
                  type="button"
                  className={
                    open
                      ? 'hook-list-section-header is-open'
                      : 'hook-list-section-header'
                  }
                  onClick={() => toggleCategory(category)}
                  aria-expanded={open}
                >
                  <span
                    className="hook-list-section-chevron"
                    aria-hidden="true"
                  >
                    {open ? '▾' : '▸'}
                  </span>
                  <span className="hook-list-section-title">{category}</span>
                </button>
                {open && (
                  <ul>
                    {HOOKS.filter(hook => hook.category === category).map(
                      hook => (
                        <li key={hook.id}>
                          <button
                            type="button"
                            className={
                              hook.id === selectedHookId
                                ? 'hook-list-item is-active'
                                : 'hook-list-item'
                            }
                            onClick={() => setSelectedHookId(hook.id)}
                          >
                            <span className="hook-name">{hook.name}</span>
                            <span className="hook-description">
                              {hook.description}
                            </span>
                          </button>
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </section>
            )
          })}
        </nav>
      }
    >
      {selectedHook?.id === 'useCounter' && <CounterDemo />}
      {selectedHook?.id === 'useToggle' && <ToggleDemo />}
      {selectedHook?.id === 'useLocalStorage' && <LocalStorageDemo />}
      {selectedHook?.id === 'useInput' && <InputDemo />}
      {selectedHook?.id === 'usePrevious' && <PreviousValueDemo />}
      {selectedHook?.id === 'useTheme' && (
        <ThemeToggleDemo theme={theme} toggleTheme={toggleTheme} />
      )}
      {selectedHook?.id === 'useScrollDirection' && <ScrollDirectionDemo />}
      {selectedHook?.id === 'useSiteMeta' && <SiteMetaDemo />}
      {selectedHook?.id === 'useUserContext' && <ContextSignalDemo />}
    </Layout>
  )
}
