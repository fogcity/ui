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
export function isWX() {
  const wx = navigator.userAgent.toLowerCase()
  if ((wx as any).match(/MicroMessenger/i) == 'micromessenger') {
    return true
  }
  return false
}
export function isAndroid() {
  const android = navigator.userAgent
  if (android.indexOf('Android') > -1 || android.indexOf('Adr') > -1) {
    return true
  }
  return false
}
export function isPC() {
  return !(isAndroid() && isWX() && isIos())
}
export function isIos() {
  const ios = navigator.userAgent
  if (!!ios.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    return true
  }
  return false
}

export function callPhoneNumber(phoneNumber: string) {
  window.location.href = 'tel:' + phoneNumber
}

export function transformFetchParamsInGet(params: { [key: string]: any }) {
  let result = '?'
  for (const key in params) {
    if ((params.prototype || params).hasOwnProperty.call(params, key)) {
      result =
        result + `${key}=${params[key]}` + (Object.keys(params)[Object.keys(params).length - 1] == key ? '' : '&')
    }
  }
  return result
}
export function getUrlParam(name: string) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

export function getUUID() {
  const url = URL.createObjectURL(new Blob([]))
  // const uuid = url.split("/").pop();
  const uuid = url.substring(url.lastIndexOf('/') + 1)
  URL.revokeObjectURL(url)
  return uuid
}

export function humpToUnderline(str: string) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}
export function underlineToHump(str: string) {
  const a = str.split('_')
  let result = a[0]
  for (var i = 1; i < a.length; i++) {
    result = result + a[i].slice(0, 1).toUpperCase() + a[i].slice(1)
  }
  return result
}
export function debounce(callback: () => void, delay: number) {
  let timer
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    callback()
    timer = null
  }, delay)
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
  console.log(output)

  return output
}
