import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["src", "player", "onLoad", "children"];
var __jsx = React.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import React, { createContext, useReducer, useEffect } from 'react';
import Script from 'next/script';
import { v4 as createGuid } from 'uuid';

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
export var PlayerContext = /*#__PURE__*/createContext([initialState, function () {
  return initialState;
}]);

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

var id = createGuid();
export var PlayerProvider = function PlayerProvider(_ref) {
  var src = _ref.src,
      player = _ref.player,
      onLoad = _ref.onLoad,
      children = _ref.children,
      args = _objectWithoutProperties(_ref, _excluded);

  var _useReducer = useReducer(reducer, initialState),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  useEffect(function () {
    if (!window.PlayerjsEvents) {
      window.PlayerjsEvents = PlayerjsEvents;
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
  }, __jsx(Script, _extends({
    id: id,
    src: player || src,
    onLoad: onLoadInner
  }, args)), children);
};