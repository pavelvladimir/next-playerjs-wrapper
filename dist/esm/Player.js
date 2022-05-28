var __jsx = React.createElement;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import React, { useContext, useState, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react';
import { PlayerContext } from './PlayerProvider';
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

var defaultPlayerState = {
  isReady: false
};
var PlayerComponent = /*#__PURE__*/forwardRef(function (props, ref) {
  var _useContext = useContext(PlayerContext),
      state = _useContext[0];

  var _useState = useState(null),
      initialProps = _useState[0],
      setInitialProps = _useState[1];

  var _useState2 = useState(null),
      player = _useState2[0],
      setPlayer = _useState2[1];

  useImperativeHandle(ref, function () {
    return player && {
      api: function api() {
        return player.api.apply(player, arguments);
      },
      event: function event(_event, listener) {
        return subscribe({
          event: _event,
          id: initialProps.id,
          listener: listener
        });
      },
      isReady: true
    } || defaultPlayerState;
  }, [initialProps, player]);
  useEffect(function () {
    if (state.playerjs && initialProps != null && !player) {
      setPlayer(new state.playerjs(initialProps));
    }

    return function () {
      if (player) player.api('destroy');

      if (initialProps != null) {
        var _iterator = _createForOfIteratorHelper(listeners[initialProps.id] || []),
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
      }
    };
  }, [player, initialProps, state.playerjs]);
  useEffect(function () {
    if (initialProps === null && props.id != null) {
      setInitialProps(props);
    } else if (initialProps === null && props.id == null) {
      console.warn("Missing mandatory property 'id'!");
    }
  }, [initialProps, props]);
  return __jsx("div", {
    id: props.id
  });
});
PlayerComponent.displayName = 'Player';
export var Player = /*#__PURE__*/React.memo(PlayerComponent, function () {
  return true;
});
export var usePlayerRef = function usePlayerRef() {
  var callFromDeprecatedFunction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (callFromDeprecatedFunction) {
    console.warn('The getPlayer function is deprecated, please use the usePlayerRef function.');
  }

  var _useState3 = useState(defaultPlayerState),
      player = _useState3[0],
      setPlayer = _useState3[1];

  var setRef = useCallback(function (ref) {
    if (ref != null) setPlayer(ref);
  }, []);
  return [setRef, player];
};