import { useEffect, useMemo, useState } from 'react'

export interface UserContext {
  geo: { country: string; region: string; city: string } | null
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
  weather: { condition: string; temp: number; unit: 'C' | 'F' } | null
  language: string
  sessionCount: number
  device: 'mobile' | 'tablet' | 'desktop'
  isLoading: boolean
  error: string | null
  meta?: UserContextMeta
}

export type UserContextMeta = {
  all: Omit<UserContext, 'meta'>
}

export type UserContextOptions = {
  weatherApiKey?: string
  weatherUnit?: 'C' | 'F'
  enableGeo?: boolean
  enableWeather?: boolean
  enableSession?: boolean
  enableDevice?: boolean
  enableLanguage?: boolean
  ipApiEndpoint?: string
  includeMeta?: boolean
}

export type InternalState = UserContext

type GeoInternal = {
  country: string
  region: string
  city: string
  latitude?: number
  longitude?: number
} | null

type IpapiResponse = {
  ip?: string
  city?: string
  region?: string
  region_code?: string
  country_code?: string
  country_code_iso3?: string
  country_name?: string
  country_capital?: string
  country_tld?: string
  continent_code?: string
  in_eu?: boolean
  postal?: string
  latitude?: number
  longitude?: number
  timezone?: string
  utc_offset?: string
  country_calling_code?: string
  currency?: string
  currency_name?: string
  languages?: string
  asn?: string
  org?: string
}

let geoCache: GeoInternal | undefined
let geoErrorCache: string | null | undefined
let geoPromise: Promise<void> | undefined

let weatherCache:
  | {
      condition: string
      temp: number
      unit: 'C' | 'F'
    }
  | null
  | undefined
let weatherErrorCache: string | null | undefined
let weatherPromise: Promise<void> | undefined

function getInitialTimeOfDay(): UserContext['timeOfDay'] {
  const now = new Date()
  const hour = now.getHours()

  if (hour >= 5 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 17) return 'afternoon'
  if (hour >= 17 && hour < 22) return 'evening'
  return 'night'
}

function useTimeOfDay(): UserContext['timeOfDay'] {
  const [timeOfDay, setTimeOfDay] = useState<UserContext['timeOfDay']>(() =>
    getInitialTimeOfDay(),
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const id = window.setInterval(() => {
      setTimeOfDay(getInitialTimeOfDay())
    }, 5 * 60 * 1000)

    return () => {
      window.clearInterval(id)
    }
  }, [])

  return timeOfDay
}

function useClientLanguage(enabled: boolean | undefined): string {
  const [language, setLanguage] = useState<string>('en')

  useEffect(() => {
    if (!enabled) return
    if (typeof navigator === 'undefined') return

    const next =
      (Array.isArray(navigator.languages) && navigator.languages[0]) ||
      navigator.language ||
      'en'

    setLanguage(next)
  }, [enabled])

  return language
}

function classifyDevice(width: number): UserContext['device'] {
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

function useDeviceType(enabled: boolean | undefined): UserContext['device'] {
  const [device, setDevice] = useState<UserContext['device']>('desktop')

  useEffect(() => {
    if (!enabled) return
    if (typeof window === 'undefined') return

    const update = () => {
      setDevice(classifyDevice(window.innerWidth))
    }

    update()

    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('resize', update)
    }
  }, [enabled])

  return device
}

const SESSION_STORAGE_KEY = 'user_session_count'
const SESSION_PAGE_LOAD_KEY = 'user_session_last_page_load_id'
const SESSION_PAGE_LOAD_ID =
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}:${Math.random()}`

function useSessionCount(enabled: boolean | undefined): {
  sessionCount: number
  loading: boolean
  error: string | null
} {
  const [sessionCount, setSessionCount] = useState(() => {
    if (typeof window === 'undefined') return 0

    try {
      const raw = window.localStorage.getItem(SESSION_STORAGE_KEY)
      return raw ? Number.parseInt(raw, 10) || 0 : 0
    } catch {
      return 0
    }
  })
  const [loading, setLoading] = useState<boolean>(!!enabled)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) {
      setLoading(false)
      return
    }

    if (typeof window === 'undefined') {
      setLoading(false)
      return
    }

    try {
      const raw = window.localStorage.getItem(SESSION_STORAGE_KEY)
      const current = raw ? Number.parseInt(raw, 10) || 0 : 0
      const lastPageId = window.localStorage.getItem(SESSION_PAGE_LOAD_KEY)

      if (lastPageId === SESSION_PAGE_LOAD_ID) {
        setSessionCount(current)
        setLoading(false)
        return
      }

      const next = current + 1

      window.localStorage.setItem(SESSION_STORAGE_KEY, String(next))
      window.localStorage.setItem(SESSION_PAGE_LOAD_KEY, SESSION_PAGE_LOAD_ID)
      setSessionCount(next)
      setLoading(false)
    } catch (err) {
      setError('Failed to access localStorage for session count')
      setSessionCount(0)
      setLoading(false)
    }
  }, [enabled])

  return { sessionCount, loading, error }
}

function mapIpapiToGeo(data: IpapiResponse | null): GeoInternal {
  if (!data) return null

  const country = data.country_name || ''
  const region = data.region || ''
  const city = data.city || ''

  return {
    country,
    region,
    city,
    latitude: typeof data.latitude === 'number' ? data.latitude : undefined,
    longitude: typeof data.longitude === 'number' ? data.longitude : undefined,
  }
}

function useGeoFromIp(
  options: UserContextOptions | undefined,
): { geo: GeoInternal; loading: boolean; error: string | null } {
  const [geo, setGeo] = useState<GeoInternal>(() => geoCache ?? null)
  const [loading, setLoading] = useState<boolean>(() =>
    options?.enableGeo === false ? false : geoCache === undefined,
  )
  const [error, setError] = useState<string | null>(() => geoErrorCache ?? null)

  useEffect(() => {
    if (options?.enableGeo === false) {
      setLoading(false)
      return
    }

    if (typeof window === 'undefined') {
      setLoading(false)
      return
    }

    if (geoCache !== undefined || geoErrorCache !== undefined) {
      setGeo(geoCache ?? null)
      setError(geoErrorCache ?? null)
      setLoading(false)
      return
    }

    const endpoint = options?.ipApiEndpoint ?? 'https://ipapi.co/json/'
    const controller = new AbortController()

    const run = async () => {
      try {
        setLoading(true)

        const response = await fetch(endpoint, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`ipapi request failed with status ${response.status}`)
        }

        const data = (await response.json()) as IpapiResponse
        const mapped = mapIpapiToGeo(data)

        if (!mapped) {
          const friendly = 'Geo lookup returned no location data for this IP'

          geoCache = null
          geoErrorCache = friendly
          setGeo(null)
          setError(friendly)
          return
        }

        geoCache = mapped
        geoErrorCache = null
        setGeo(mapped)
        setError(null)
      } catch (err) {
        if ((err as Error).name === 'AbortError') return

        const message =
          err instanceof Error ? err.message : 'Unknown error while fetching geo'
        const friendly = `Failed to load geo: ${message}`

        geoCache = null
        geoErrorCache = friendly
        setGeo(null)
        setError(friendly)
      } finally {
        setLoading(false)
      }
    }

    if (!geoPromise) {
      geoPromise = run()
    } else {
      geoPromise.then(() => {
        setGeo(geoCache ?? null)
        setError(geoErrorCache ?? null)
        setLoading(false)
      })
    }

    return () => {
      controller.abort()
    }
  }, [options?.enableGeo, options?.ipApiEndpoint])

  return { geo, loading, error }
}

function useWeatherForGeo(
  geo: GeoInternal,
  options: UserContextOptions | undefined,
): {
  weather: UserContext['weather']
  loading: boolean
  error: string | null
} {
  const [weather, setWeather] = useState<UserContext['weather']>(() =>
    weatherCache === undefined ? null : weatherCache,
  )
  const [loading, setLoading] = useState<boolean>(() =>
    options?.enableWeather === false ? false : weatherCache === undefined,
  )
  const [error, setError] = useState<string | null>(() => weatherErrorCache ?? null)

  useEffect(() => {
    if (options?.enableWeather === false) {
      setLoading(false)
      return
    }

    if (!options?.weatherApiKey) {
      setLoading(false)
      return
    }

    if (!geo || typeof geo.latitude !== 'number' || typeof geo.longitude !== 'number') {
      setLoading(false)
      return
    }

    if (typeof window === 'undefined') {
      setLoading(false)
      return
    }

    if (weatherCache !== undefined || weatherErrorCache !== undefined) {
      setWeather(weatherCache ?? null)
      setError(weatherErrorCache ?? null)
      setLoading(false)
      return
    }

    const controller = new AbortController()
    const unit = options.weatherUnit ?? 'C'
    const unitsParam = unit === 'C' ? 'metric' : 'imperial'

    const run = async () => {
      try {
        setLoading(true)

        const url = new URL('https://api.openweathermap.org/data/2.5/weather')
        url.searchParams.set('lat', String(geo.latitude))
        url.searchParams.set('lon', String(geo.longitude))
        url.searchParams.set('appid', options.weatherApiKey as string)
        url.searchParams.set('units', unitsParam)

        const response = await fetch(url.toString(), {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`weather request failed with status ${response.status}`)
        }

        const data = (await response.json()) as {
          weather?: { main?: string; description?: string }[]
          main?: { temp?: number }
        }

        const condition =
          data.weather?.[0]?.description ||
          data.weather?.[0]?.main ||
          'Unknown conditions'
        const temp = typeof data.main?.temp === 'number' ? data.main.temp : 0

        const mapped = {
          condition,
          temp,
          unit,
        } as const

        weatherCache = mapped
        weatherErrorCache = null
        setWeather(mapped)
        setError(null)
      } catch (err) {
        if ((err as Error).name === 'AbortError') return

        const message =
          err instanceof Error ? err.message : 'Unknown error while fetching weather'
        const friendly = `Failed to load weather: ${message}`

        weatherCache = null
        weatherErrorCache = friendly
        setWeather(null)
        setError(friendly)
      } finally {
        setLoading(false)
      }
    }

    if (!weatherPromise) {
      weatherPromise = run()
    } else {
      weatherPromise.then(() => {
        setWeather(weatherCache ?? null)
        setError(weatherErrorCache ?? null)
        setLoading(false)
      })
    }

    return () => {
      controller.abort()
    }
  }, [geo, options?.enableWeather, options?.weatherApiKey, options?.weatherUnit])

  return { weather, loading, error }
}

export function useUserContextInternal(options?: UserContextOptions): InternalState {
  const timeOfDay = useTimeOfDay()
  const language = useClientLanguage(options?.enableLanguage ?? true)
  const device = useDeviceType(options?.enableDevice ?? true)
  const { sessionCount, loading: loadingSession, error: sessionError } = useSessionCount(
    options?.enableSession ?? true,
  )
  const {
    geo,
    loading: loadingGeo,
    error: geoError,
  } = useGeoFromIp(options)
  const {
    weather,
    loading: loadingWeather,
    error: weatherError,
  } = useWeatherForGeo(geo, options)

  const error = useMemo(() => {
    const parts = [geoError, weatherError, sessionError].filter(
      (part): part is string => Boolean(part),
    )

    return parts.length > 0 ? parts.join('; ') : null
  }, [geoError, weatherError, sessionError])

  const isLoading = loadingGeo || loadingWeather || loadingSession
  const base: Omit<UserContext, 'meta'> = {
    geo: geo
      ? {
          country: geo.country,
          region: geo.region,
          city: geo.city,
        }
      : null,
    timeOfDay,
    weather,
    language,
    sessionCount,
    device,
    isLoading,
    error,
  }

  if (options?.includeMeta) {
    const all: Omit<UserContext, 'meta'> = base

    return {
      ...base,
      meta: {
        all,
      },
    }
  }

  return base
}

