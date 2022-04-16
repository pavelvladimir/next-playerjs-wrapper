"use strict";

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.is-array.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = void 0;

require("core-js/modules/es.array.concat.js");

var _react = _interopRequireWildcard(require("react"));

var _PlayerProvider = require("./PlayerProvider");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __jsx = _react["default"].createElement;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var listeners = {};

var subscribe = function subscribe(_ref) {
  var id = _ref.id,
      listenedEvent = _ref.event,
      listener = _ref.listener;

  var messageEventHandler = function messageEventHandler(event) {
    var _ref2 = event.data || {},
        innerEvent = _ref2.event,
        id = _ref2.id,
        payload = _ref2.payload,
        type = _ref2.type;

    if (type === 'playerjs' && id === id && innerEvent === listenedEvent) {
      listener(payload);
    }
  };

  window.addEventListener('message', messageEventHandler);

  var detachEventListener = function detachEventListener() {
    window.removeEventListener('message', messageEventHandler);
  };

  listeners[id] = (listeners[id] || []).concat(detachEventListener);
  return detachEventListener;
};

var PlayerComponent = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var _useContext = (0, _react.useContext)(_PlayerProvider.PlayerContext),
      state = _useContext[0];

  var _useState = (0, _react.useState)(null),
      player = _useState[0],
      setPlayer = _useState[1];

  (0, _react.useImperativeHandle)(ref, function () {
    return player && {
      api: function api() {
        return player.api.apply(player, arguments);
      },
      event: function event(_event, listener) {
        return subscribe({
          event: _event,
          id: props.id,
          listener: listener
        });
      },
      isReady: true
    } || {
      isReady: false
    };
  });
  (0, _react.useEffect)(function () {
    if (state.playerjs && !player) {
      setPlayer(new state.playerjs(props));
    }

    return function () {
      if (player) player.api('destroy');

      var _iterator = _createForOfIteratorHelper(listeners[props.id] || []),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var listener = _step.value;
          listener();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    };
  }, [state.playerjs]);
  return __jsx("div", {
    id: props.id
  });
});
PlayerComponent.displayName = 'Player';
var Player = PlayerComponent;
exports.Player = Player;