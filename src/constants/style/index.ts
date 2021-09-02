export type ColorFormat = 'rgb' | 'rgba' | 'hsl' | 'hsla'
export interface ColorObject {
  type: ColorFormat
  values: any[]
}
export const defaultStyle = {
  '@global': {
    html: {
      boxSizing: 'border-box',
      webkitTextSizeAdjust: '100%',
      wordBreak: 'normal',
      mozTabSize: '4',
      tabSize: '4',
    },
    '*, ::before, ::after': {
      backgroundRepeat: 'no-repeat',
      boxSizing: 'inherit',
    },
    '::before, ::after': {
      textDecoration: 'inherit',
      verticalAlign: 'inherit',
    },
    '*': {
      padding: '0',
      margin: '0',
    },
    hr: {
      overflow: 'visible',
      height: '0',
      color: 'inherit',
    },
    'details, main': {
      display: 'block',
    },
    summary: {
      display: 'list-item',
    },
    small: {
      fontSize: '80%',
    },
    '[hidden]': {
      display: 'none',
    },
    'abbr[title]': {
      borderBottom: 'none',
      textDecoration: 'underline dotted',
    },
    a: {
      backgroundColor: 'transparent',
    },
    'a:active, a:hover': {
      outlineWidth: '0',
    },
    'code, kbd, pre, samp': {
      fontFamily: 'monospace, monospace',
    },
    pre: {
      fontSize: '1em',
    },
    'b, strong': {
      fontWeight: 'bolder',
    },
    'sub, sup': {
      fontSize: '75%',
      lineHeight: '0',
      position: 'relative',
      verticalAlign: 'baseline',
    },
    sub: {
      bottom: '-0.25em',
    },
    sup: {
      top: '-0.5em',
    },
    table: {
      borderColor: 'inherit',
      textIndent: '0',
    },
    'input::-webkit-outer-spin-button': {
      webkitAppearance: 'none !important',
      margin: 0,
    },
    'input::-webkit-inner-spin-button': {
      webkitAppearance: 'none !important',
      margin: 0,
    },
    '[disabled]': {
      cursor: 'default',
    },
    "[type='number']::-webkit-outer-spin-button": {
      webkitAppearance: 'none',
      height: 'auto',
    },
    "[type='number']::-webkit-inner-spin-button": {
      webkitAppearance: 'textfield',
      height: 'auto',
    },
    "[type='search']": {
      webkitAppearance: 'textfield',
      outlineOffset: -2,
    },
    "[type='search']::-webkit-search-decoration": {
      webkitAppearance: 'none',
    },
    textarea: {
      overflow: 'auto',
      resize: 'vertical',
    },
    'button, input, optgroup, select, textarea': {
      font: 'inherit',
    },
    optgroup: {
      fontWeight: 'bold',
    },
    button: {
      overflow: 'visible',
    },
    'button, select': {
      textTransform: 'none',
    },
    "button, [type='button'], [type='reset'], [type='submit'], [role='button']": {
      cursor: 'pointer',
      color: 'inherit',
    },
    "button::-moz-focus-inner, [type='button']::-moz-focus-inner, [type='reset']::-moz-focus-inner, [type='submit']::-moz-focus-inner":
      {
        borderStyle: 'none',
        padding: '0',
      },
    "button:-moz-focusring, [type='button']::-moz-focus-inner, [type='reset']::-moz-focus-inner, [type='submit']::-moz-focus-inner":
      {
        outline: '1px dotted ButtonText',
      },
    "button, html [type='button'], [type='reset'], [type='submit']": {
      webkitAppearance: 'button',
    },
    'button, input, select, textarea': {
      backgroundColor: 'transparent',
      borderStyle: 'none',
      border: 'none',
    },
    'a:focus, button:focus, input:focus, select:focus, textarea:focus': {
      outlineWidth: '0',
    },
    select: {
      mozAppearance: 'none',
      webkitAppearance: 'none',
    },
    'select::-ms-expand': {
      display: 'none',
    },
    'select::-ms-value': {
      color: 'currentColor',
    },
    legend: {
      border: '0',
      color: 'inherit',
      display: 'table',
      maxWidth: '100%',
      whiteSpace: 'normal',
    },
    '::-webkit-file-upload-button': {
      webkitAppearance: 'button',
      color: 'inherit',
      font: 'inherit',
    },
    img: {
      borderStyle: 'none',
    },
    progress: {
      verticalAlign: 'baseline',
    },
    "[aria-busy='true']": {
      cursor: 'progress',
    },
    '[aria-controls]': {
      cursor: 'pointer',
    },
    "[aria-disabled='true']": {
      cursor: 'default',
    },
  },
}

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(min, value), max)
}

export function hexToRgb(color: string) {
  color = color.substr(1)

  const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, 'g')
  let colors = color.match(re)

  if (colors && colors[0].length === 1) {
    colors = colors.map((n) => n + n)
  }

  return colors
    ? `rgb${colors.length === 4 ? 'a' : ''}(${colors
        .map((n, index) => {
          return index < 3 ? parseInt(n, 16) : Math.round((parseInt(n, 16) / 255) * 1000) / 1000
        })
        .join(', ')})`
    : ''
}

function intToHex(int: number) {
  const hex = int.toString(16)
  return hex.length === 1 ? `0${hex}` : hex
}

export function rgbToHex(color: string) {
  // Idempotent
  if (color.indexOf('#') === 0) {
    return color
  }

  const { values } = decomposeColor(color)
  return `#${values.map((n) => intToHex(n)).join('')}`
}

export function hslToRgb(color: string) {
  const decomposedColor: ColorObject = decomposeColor(color)
  const { values } = decomposedColor
  const h = values[0]
  const s = values[1] / 100
  const l = values[2] / 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)

  let type = 'rgb'
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)]

  if (decomposedColor.type === 'hsla') {
    type += 'a'
    rgb.push(values[3])
  }

  return recomposeColor({ type: type as ColorFormat, values: rgb })
}

export function decomposeColor(color: string): ColorObject {
  // Idempotent

  if (color.charAt(0) === '#') {
    return decomposeColor(hexToRgb(color))
  }

  const marker = color.indexOf('(')
  const type = color.substring(0, marker) as ColorFormat

  if (['rgb', 'rgba', 'hsl', 'hsla'].indexOf(type) === -1) {
    throw new Error('We support the following formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla().')
  }

  const values = color.substring(marker + 1, color.length - 1).split(',')

  return { type, values: values.map((value) => parseFloat(value)) }
}

export function recomposeColor(color: ColorObject) {
  const { type } = color
  let { values } = color

  if (type.indexOf('rgb') !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    values = values.map((n, i) => (i < 3 ? parseInt(n, 10) : n))
  } else if (type.indexOf('hsl') !== -1) {
    values[1] = `${values[1]}%`
    values[2] = `${values[2]}%`
  }

  return `${type}(${values.join(', ')})`
}

export function getContrastRatio(foreground: string, background: string): number {
  const lumA = getLuminance(foreground)
  const lumB = getLuminance(background)
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05)
}

export function getLuminance(color: string) {
  const decomposedColor = decomposeColor(color)

  let rgb = decomposedColor.type === 'hsl' ? decomposeColor(hslToRgb(color)).values : decomposedColor.values
  rgb = rgb.map((val) => {
    val /= 255 // normalized
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4
  })

  // Truncate at 3 digits
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3))
}

export function emphasize(color: string, coefficient = 0.15) {
  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient)
}

export function fade(color: string, value: number) {
  const decomposedColor = decomposeColor(color)
  value = clamp(value)

  if (decomposedColor.type === 'rgb' || decomposedColor.type === 'hsl') {
    decomposedColor.type += 'a'
  }
  decomposedColor.values[3] = value

  return recomposeColor(decomposedColor)
}

export function darken(color: string, coefficient: number) {
  const decomposedColor = decomposeColor(color)
  coefficient = clamp(coefficient)

  if (decomposedColor.type.indexOf('hsl') !== -1) {
    decomposedColor.values[2] *= 1 - coefficient
  } else if (decomposedColor.type.indexOf('rgb') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      decomposedColor.values[i] *= 1 - coefficient
    }
  }
  return recomposeColor(decomposedColor)
}

export function lighten(color: string, coefficient: number) {
  const decomposedColor = decomposeColor(color)
  coefficient = clamp(coefficient)

  if (decomposedColor.type.indexOf('hsl') !== -1) {
    decomposedColor.values[2] += (100 - decomposedColor.values[2]) * coefficient
  } else if (decomposedColor.type.indexOf('rgb') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      decomposedColor.values[i] += (255 - decomposedColor.values[i]) * coefficient
    }
  }

  return recomposeColor(decomposedColor)
}
