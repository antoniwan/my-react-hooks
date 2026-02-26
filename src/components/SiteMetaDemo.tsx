import { useSiteMeta } from '../hooks/useSiteMeta'

export function SiteMetaDemo() {
  const { version, repoUrl } = useSiteMeta()

  return (
    <div className="hook-demo">
      <div className="hook-demo-header">
        <h2>useSiteMeta</h2>
        <p className="hook-demo-description">
          Provides site metadata such as version and GitHub repository URL from build-time config.
        </p>
      </div>

      <p>
        Version: <code>{version}</code>
      </p>
      <p>
        Repo:{' '}
        <a href={repoUrl} target="_blank" rel="noreferrer">
          {repoUrl}
        </a>
      </p>
    </div>
  )
}

