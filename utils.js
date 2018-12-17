'use strict';

function present(value) {
  if (value === false) {
    return false
  } else if (value === undefined || value === null) {
    return false;
  } else if (Number.isNaN(value)) {
    return false;
  } else if (Object.prototype.toString.call(value) === '[object Date]') {
    return true;
  } else if (value instanceof RegExp) {
    return true;
  } else if (typeof value === 'string' && value.trim().length === 0) {
    return false;
  } else if (Array.isArray(value) && value.length === 0) {
    return false;
  } else if (typeof value === 'object' && Object.keys(value).length === 0) {
    return false;
  } else {
    return true;
  }
}

function presence(value) {
  return present(value) ? value : false;
}

function blank(value) {
  return !present(value);
}

module.exports = { blank, present, presence };
