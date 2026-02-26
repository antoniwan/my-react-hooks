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

  return (
    <div className="hook-demo">
      <div className="hook-demo-header">
        <h2>useUserContext</h2>
        <p className="hook-demo-description">
          Aggregates geo, time of day, language, device, session count, and optional
          weather into a single context object.
        </p>
      </div>

      <div className="context-signal-grid">
        <div className="context-signal-row">
          <span className="context-signal-label">Loading</span>
          <span className="context-signal-value">{isLoading ? 'Yes' : 'No'}</span>
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
            {geo ? `${geo.city || 'Unknown city'}, ${geo.region || 'Unknown region'}, ${geo.country || 'Unknown country'}` : 'Unknown'}
          </span>
        </div>

        <div className="context-signal-row">
          <span className="context-signal-label">Weather</span>
          <span className="context-signal-value">
            {weather
              ? `${Math.round(weather.temp)}°${weather.unit} · ${weather.condition}`
              : weatherApiKey
                ? 'Unknown'
                : 'Disabled (no API key)'}
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

