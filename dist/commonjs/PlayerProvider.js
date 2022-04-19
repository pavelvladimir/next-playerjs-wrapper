"use strict";

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.array.for-each.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.object.define-properties.js");

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerProvider = exports.PlayerContext = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _script = _interopRequireDefault(require("next/script"));

var _uuid = require("uuid");

var _excluded = ["src", "player", "onLoad", "eventsApiMethodName", "children"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __jsx = _react["default"].createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var reducer = function reducer(state, action) {
  switch (action.type) {
    case 'SET_PLAYERJS':
      return _objectSpread(_objectSpread({}, state), {}, {
        playerjs: action.payload
      });

    default:
      return state;
  }
};

var initialState = {
  playerjs: null
};
var PlayerContext = /*#__PURE__*/(0, _react.createContext)([initialState, function () {
  return initialState;
}]);
exports.PlayerContext = PlayerContext;

var setPlayerjs = function setPlayerjs(payload) {
  return {
    payload: payload,
    type: 'SET_PLAYERJS'
  };
};

var PlayerjsEvents = function PlayerjsEvents(event, id, data) {
  window.postMessage({
    event: event,
    id: id,
    payload: data,
    type: 'playerjs'
  }, '*');
};

var id = (0, _uuid.v4)();

var PlayerProvider = function PlayerProvider(_ref) {
  var src = _ref.src,
      player = _ref.player,
      onLoad = _ref.onLoad,
      _ref$eventsApiMethodN = _ref.eventsApiMethodName,
      eventsApiMethodName = _ref$eventsApiMethodN === void 0 ? 'PlayerjsEvents' : _ref$eventsApiMethodN,
      children = _ref.children,
      args = (0, _objectWithoutProperties2["default"])(_ref, _excluded);

  var _useReducer = (0, _react.useReducer)(reducer, initialState),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  (0, _react.useEffect)(function () {
    if (!window[eventsApiMethodName]) {
      window[eventsApiMethodName] = PlayerjsEvents;
    }

    if (!state.playerjs && window.Playerjs) {
      dispatch(setPlayerjs(window.Playerjs));
    }
  });

  var onLoadInner = function onLoadInner(event) {
    dispatch(setPlayerjs(window.Playerjs));
    return onLoad && onLoad(event);
  };

  return __jsx(PlayerContext.Provider, {
    value: [state, dispatch]
  }, __jsx(_script["default"], (0, _extends2["default"])({
    id: id,
    src: player || src,
    onLoad: onLoadInner
  }, args)), children);
};

exports.PlayerProvider = PlayerProvider;