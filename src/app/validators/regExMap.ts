export default {
  hexColor: /[0-9a-f]{6}/i,
  phone: /^((\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4})|([2-9]{2}[0-9]{8})$/,
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  twoLowerCase: /[a-z].*[a-z]/,
  twoUpperCase: /[A-Z].*[A-Z]/,
  twoNumerals: /[0-9].*[0-9]/,
  twoSpecial: /[^A-Za-z0-9].*[^A-Za-z0-9]/,
  url: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
  urlOrEmail: /^$|^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$|^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  numeric: /[0-9]/,
  decimal: /^[0-9]+(\.[0-9]{1,2})?$/
};
