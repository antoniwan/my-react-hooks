import './App.css'
import { Analytics } from '@vercel/analytics/react'
import { SiteFooter } from './components/SiteFooter'
import { HookExplorer } from './features/hooksExplorer'
import { useTheme } from './hooks/useTheme'
import { useScrollDirection } from './hooks/useScrollDirection'
import { useSiteMeta } from './hooks/useSiteMeta'

function App() {
  const { theme, toggleTheme } = useTheme()
  const { direction, atTop, atBottom } = useScrollDirection({ threshold: 10 })
  const { version, repoUrl } = useSiteMeta()

  const showFooter = atBottom || atTop || direction === 'up'

  return (
    <>
      <HookExplorer theme={theme} toggleTheme={toggleTheme} />
      <SiteFooter
        version={version}
        repoUrl={repoUrl}
        visible={showFooter}
        links={[]}
      />
      <Analytics />
    </>
  )
}

export default App
