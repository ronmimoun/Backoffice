export const REGEX = {
  UPPER_CASE: {
    REGEX: /\b[A-Z][A-Z0-9]+\b/,
    MESSAGE: "Only uppercase",
  },
  LINKED_IN:
    /^(?:http(?:s)?:\/\/)?(?:www\.|\w\w\.)?linkedin\.com\/((?:in)\/(?:[a-zA-Z0-9-]{5,30}(?:\/)?)|(?:profile\/)(?:view\?id=[0-9]+))?$/gm,
  PHONE: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
  FIRST_LETTER_CAPITAL: {
    REGEX: /^[A-Z][a-z0-9_-]{1,10}$/,
    MESSAGE: "First letter most be capital",
  },
  WITHOUT_NUMBERS: {
    REGEX: /^([^0-9]*)$/,
    MESSAGE: "Numbers not allowed",
  },
};
