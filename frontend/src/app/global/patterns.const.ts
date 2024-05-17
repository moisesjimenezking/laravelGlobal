export const PATTERNS = {
  PHONE_NUMBER: /^(58|\+58|(\(\+58\))?)0{0,1}(242|412|414|416|424|426)\d{7}$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  DNI_ID: /^(V|J|M|G|E)[0-9]{5,9}$/,
  DNI: /^[a-zA-Z0-9\-]{0,20}$/,
  NAME: /^([A-Z ]){0,20}$/,
  NAME_EXTEND: /^([A-Z ]){0,50}$/,
};
