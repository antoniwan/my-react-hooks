import type { ReactNode } from 'react'

type LayoutProps = {
  header?: ReactNode
  sidebar?: ReactNode
  children: ReactNode
}

export function Layout({ header, sidebar, children }: LayoutProps) {
  const hasSidebar = Boolean(sidebar)

  return (
    <div className="app-shell">
      {header && <header className="app-header">{header}</header>}
      <div
        className={
          hasSidebar ? 'app-content app-content--with-sidebar' : 'app-content'
        }
      >
        {hasSidebar && <aside className="app-sidebar">{sidebar}</aside>}
        <main className={hasSidebar ? 'app-main' : 'app-main app-main--full'}>
          {children}
        </main>
      </div>
    </div>
  )
}
