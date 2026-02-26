// VERSION is injected at build time from package.json via vite.config.ts
const VERSION = import.meta.env.VITE_SITE_VERSION ?? '0.0.0'

const REPO_URL =
  import.meta.env.VITE_SITE_REPO_URL ?? 'https://github.com/antoniwan/my-react-hooks'

export function useSiteMeta() {
  return {
    version: VERSION,
    repoUrl: REPO_URL,
  }
}

