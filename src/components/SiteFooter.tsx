type FooterLink = {
  label: string
  href: string
}

type SiteFooterProps = {
  version: string
  repoUrl: string
  links?: FooterLink[]
  visible: boolean
}

export function SiteFooter({
  version,
  repoUrl,
  links,
  visible,
}: SiteFooterProps) {
  return (
    <footer
      className={visible ? 'site-footer is-visible' : 'site-footer is-hidden'}
    >
      <div className="site-footer-inner">
        <span className="site-footer-meta">my-react-hooks · {version}</span>
        <a
          href={repoUrl}
          target="_blank"
          rel="noreferrer"
          className="site-footer-link"
        >
          GitHub
        </a>
        {links && links.length > 0 && (
          <ul className="site-footer-links">
            {links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="site-footer-link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  )
}
