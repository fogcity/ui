export function isBrowerDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}
export function isObject(item: any) {
  return item && typeof item === 'object' && item.constructor === Object
}
export function getBase64(img: Blob, callback: (arg0: string | ArrayBuffer | null) => void) {
  const reader = new FileReader()
  reader.addEventListener('load', () => {
    callback(reader.result)
  })
  reader.readAsDataURL(img)
}

export function deepmerge(target: any, source: any, options = { clone: true }) {
  const output = options.clone ? { ...target } : target

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      // Avoid prototype pollution
      if (key === '__proto__') {
        return
      }

      if (isObject(source[key]) && key in target) {
        output[key] = deepmerge(target[key], source[key], options)
      } else {
        output[key] = source[key]
      }
    })
  }

  return output
}
