"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.Fragment = Fragment;
exports.getDirection = getDirection;
exports.useLocale = useLocale;

var _react = _interopRequireWildcard(require("react"));
var _isLocaleRTL = require("./isLocaleRTL");

var defaultLocale = {
  direction: 'ltr',
  locale: 'en-US'
};

var LocaleContext = _react.createContext(defaultLocale);

function getDirection(locale) {
  return (0, _isLocaleRTL.isLocaleRTL)(locale) ? 'rtl' : 'ltr';
}

function Fragment(props) {
  var direction = props.direction;
  var locale = props.locale;
  var children = props.children;
  var needsContext = direction || locale;

  return needsContext
    ? _react.default.createElement(
        LocaleContext.Provider,
        {
          value: {
            direction: locale ? getDirection(locale) : direction || 'ltr',
            locale: locale || 'en-US'
          },
          children: children
        }
      )
    : children;
}

function useLocale() {
  return (0, _react.useContext)(LocaleContext);
}
