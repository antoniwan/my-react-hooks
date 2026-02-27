import { useScrollDirection } from '../hooks/useScrollDirection'

export function ScrollDirectionDemo() {
  const { direction, scrollY, atTop, atBottom } = useScrollDirection()

  return (
    <div className="hook-demo">
      <div className="hook-demo-header">
        <h2>useScrollDirection</h2>
        <p className="hook-demo-description">
          Detects scroll direction and basic position (top/bottom) for
          scroll-aware UI.
        </p>
      </div>

      <p>
        Direction: <strong>{direction}</strong>
      </p>
      <p>Scroll Y: {Math.round(scrollY)}px</p>
      <p>At top: {atTop ? 'yes' : 'no'}</p>
      <p>At bottom: {atBottom ? 'yes' : 'no'}</p>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        Scroll the page up and down to see these values change.
      </p>
    </div>
  )
}
