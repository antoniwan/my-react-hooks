import { useUserContext } from '../hooks/useUserContext'

type ContextSignalDemoProps = {
  weatherApiKey?: string
}

export function ContextSignalDemo({ weatherApiKey }: ContextSignalDemoProps) {
  const context = useUserContext({
    weatherApiKey,
    weatherUnit: 'C',
    enableGeo: true,
    enableWeather: Boolean(weatherApiKey),
    enableSession: true,
    enableDevice: true,
    enableLanguage: true,
  })

  const { geo, timeOfDay, weather, language, sessionCount, device, isLoading, error } =
    context

  const hasWeatherConfigured = Boolean(weatherApiKey)
  const locationLabel = geo
    ? [geo.city, geo.region, geo.country].filter(Boolean).join(', ')
    : 'Unknown location'
  const weatherLabel = weather
    ? `${Math.round(weather.temp)}°${weather.unit} · ${weather.condition}`
    : hasWeatherConfigured
      ? isLoading
        ? 'Loading…'
        : 'Unavailable'
      : 'Disabled (no API key)'

  return (
    <div className="hook-demo">
      <div className="hook-demo-header">
        <h2>useUserContext</h2>
        <p className="hook-demo-description">
          Aggregates geo, time of day, language, device, session count, and optional
          weather into a single context object.
        </p>
      </div>

      <div className="context-summary">
        <div className="context-summary-pills">
          <span
            className={
              isLoading ? 'context-pill context-pill--neutral' : 'context-pill context-pill--success'
            }
          >
            {isLoading ? 'Loading signals…' : 'Signals ready'}
          </span>
          {error && (
            <span className="context-pill context-pill--error" aria-live="polite">
              Error
            </span>
          )}
          {!hasWeatherConfigured && (
            <span className="context-pill context-pill--muted">
              Weather disabled (no API key)
            </span>
          )}
        </div>
        <p className="context-summary-text">
          {geo
            ? `Looks like you're in ${locationLabel}. It's currently ${timeOfDay}.`
            : 'We will infer your location and other signals as the data loads.'}
        </p>
      </div>

      <div className="context-signal-grid">
        <div className="context-signal-row">
          <span className="context-signal-label">Status</span>
          <span className="context-signal-value">
            {isLoading ? 'Loading…' : error ? 'Error' : 'OK'}
          </span>
        </div>

        <div className="context-signal-row">
          <span className="context-signal-label">Time of day</span>
          <span className="context-signal-value">{timeOfDay}</span>
        </div>

        <div className="context-signal-row">
          <span className="context-signal-label">Language</span>
          <span className="context-signal-value">{language}</span>
        </div>

        <div className="context-signal-row">
          <span className="context-signal-label">Device</span>
          <span className="context-signal-value">{device}</span>
        </div>

        <div className="context-signal-row">
          <span className="context-signal-label">Session count</span>
          <span className="context-signal-value">{sessionCount}</span>
        </div>

        <div className="context-signal-row">
          <span className="context-signal-label">Geo</span>
          <span className="context-signal-value">
            {locationLabel}
          </span>
        </div>

        <div className="context-signal-row">
          <span className="context-signal-label">Weather</span>
          <span className="context-signal-value">
            {weatherLabel}
          </span>
        </div>

        <div className="context-signal-row">
          <span className="context-signal-label">Error</span>
          <span className="context-signal-value">{error ?? 'None'}</span>
        </div>
      </div>
    </div>
  )
}

