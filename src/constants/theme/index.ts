import { darken, lighten, fade, emphasize } from '../style'
const theme: Theme = {
  mode: 'light',
  color: {
    primary: '#231F9C',
    black: '#111827',
    grey: '#6b7280',
    red: '#e32b3a',
    greyLight: '#F3F4F6',
    white: '#fff',
    darken,
    lighten,
    fade,
    emphasize,
  },
  zIndex: {
    appBar: 700,
    footer: 700,
    floatingWindow: 1000,
    modal: 1100,
    overlay: 1000,
    notification: 1400,
    drawer: 1200,
  },
  shadow: {
    color: 'rgba(0,0,0,.1)',
  },
  footer: {
    height: '3em',
  },
  appBar: {
    height: '3em',
  },
}
type Theme = {
  mode: 'dark' | 'light'
  footer: {
    height: string
  }
  appBar: {
    height: string
  }
  zIndex: {
    floatingWindow: number
    appBar: number
    footer: number
    modal: number
    overlay: number
    notification: number
    drawer: number
  }
  shadow: {
    color: string
  }
  color: Partial<{
    primary: string
    black: string
    grey: string
    greyLight: string
    white: string
    red: string
    darken: typeof darken
    lighten: typeof lighten
    fade: typeof fade
    emphasize: typeof emphasize
  }>
}

export { theme, Theme }
