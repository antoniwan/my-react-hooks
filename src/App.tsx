import './App.css'
import { Analytics } from '@vercel/analytics/react'
import { SiteFooter } from './components/SiteFooter'
import { HookExplorer } from './features/hooksExplorer'
import { useTheme } from './hooks/useTheme'
import { useScrollDirection } from './hooks/useScrollDirection'
import { useSiteMeta } from './hooks/useSiteMeta'
import { PrinciplesPage } from './components/PrinciplesPage'
import { RoadmapPage } from './components/RoadmapPage'
import { useState } from 'react'

function App() {
  const { theme, toggleTheme } = useTheme()
  const { direction, atTop, atBottom } = useScrollDirection({ threshold: 10 })
  const { version, repoUrl } = useSiteMeta()

  const [activePage, setActivePage] = useState<
    'hooks' | 'principles' | 'roadmap'
  >('hooks')

  const showFooter = atBottom || atTop || direction === 'up'

  return (
    <>
      {activePage === 'hooks' && (
        <HookExplorer
          theme={theme}
          toggleTheme={toggleTheme}
          activePage={activePage}
          onNavigate={setActivePage}
        />
      )}
      {activePage === 'principles' && (
        <PrinciplesPage
          theme={theme}
          toggleTheme={toggleTheme}
          activePage={activePage}
          onNavigate={setActivePage}
        />
      )}
      {activePage === 'roadmap' && (
        <RoadmapPage
          theme={theme}
          toggleTheme={toggleTheme}
          activePage={activePage}
          onNavigate={setActivePage}
        />
      )}
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
