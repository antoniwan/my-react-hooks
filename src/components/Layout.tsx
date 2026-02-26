import type { ReactNode } from 'react'

type LayoutProps = {
  header?: ReactNode
  sidebar?: ReactNode
  children: ReactNode
}

export function Layout({ header, sidebar, children }: LayoutProps) {
  return (
    <div className="app-shell">
      {header && <header className="app-header">{header}</header>}
      <div className="app-content">
        {sidebar && <aside className="app-sidebar">{sidebar}</aside>}
        <main className="app-main">{children}</main>
      </div>
    </div>
  )
}

