const copy = (text: string) => {
  const transfer = document.createElement('input');
  document.body.appendChild(transfer);
  transfer.value = text;
  transfer.select();
  if (document.execCommand('copy')) {
    document.execCommand('copy');
  }
  document.body.removeChild(transfer);
};

function isBrowerTabInView() {
  return !document.hidden;
}
const clamp = (target: number, min: number, max: number) => {
  if (target < min) {
    return min;
  } else if (target > max) {
    return max;
  }
  return target;
};
const isWX = () => {
  const wx = navigator.userAgent.toLowerCase();
  if ((wx as any).match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  }
  return false;
};
const isAndroid = () => {
  const android = navigator.userAgent;
  if (android.indexOf('Android') > -1 || android.indexOf('Adr') > -1) {
    return true;
  }
  return false;
};
const isIos = () => {
  const ios = navigator.userAgent;
  if (!!ios.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    return true;
  }
  return false;
};

const callPhoneNumber = (phoneNumber: string) => {
  window.location.href = 'tel:' + phoneNumber;
};

const transformFetchParamsInGet = (params: { [key: string]: any }) => {
  let result = '?';
  for (const key in params) {
    if ((params.prototype || params).hasOwnProperty.call(params, key)) {
      result =
        result + `${key}=${params[key]}` + (Object.keys(params)[Object.keys(params).length - 1] == key ? '' : '&');
    }
  }
  return result;
};
const useUrlParams = (name: string) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return '';
};

const getUUID = () => {
  const url = URL.createObjectURL(new Blob([]));
  // const uuid = url.split("/").pop();
  const uuid = url.substring(url.lastIndexOf('/') + 1);
  URL.revokeObjectURL(url);
  return uuid;
};

const humpToUnderline = (str: string) => {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
};
const underlineToHump = (str: string) => {
  const a = str.split('_');
  let result = a[0];
  for (let i = 1; i < a.length; i++) {
    result = result + a[i].slice(0, 1).toUpperCase() + a[i].slice(1);
  }
  return result;
};

function utf8ToB64(str: string) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function b64ToUtf8(str: string) {
  return decodeURIComponent(escape(window.atob(str)));
}

function isPC() {
  return !isAndroid() && !isWX() && !isIos();
}
function isBrowerDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
function isObject(item: any) {
  return item && typeof item === 'object' && item.constructor === Object;
}

function deepMerge(target: any, source: any) {
  // console.log(target)
  // console.log(source)
  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object) Object.assign(source[key], deepMerge(target[key], source[key]));
  }

  // Join `target` and modified `source`
  Object.assign(target || {}, source);
  return target;
}

// eslint-disable-next-line @typescript-eslint/ban-types
function debounce(fn: Function, delay = 500): Function {
  let timer: any;
  return function (this: any, ...args: any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
export {
  isBrowerDarkMode,
  isObject,
  debounce,
  utf8ToB64,
  b64ToUtf8,
  underlineToHump,
  humpToUnderline,
  useUrlParams,
  transformFetchParamsInGet,
  callPhoneNumber,
  isPC,
  isWX,
  isAndroid,
  isIos,
  isBrowerTabInView,
  copy,
  clamp,
  getUUID,
  deepMerge,
};
