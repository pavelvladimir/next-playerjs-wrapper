function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { createContext, useReducer, useEffect } from 'react';
import Script from 'next/script';
import { v4 as createGuid } from 'uuid';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PLAYERJS':
      return { ...state,
        playerjs: action.payload
      };

    default:
      return state;
  }
};

const initialState = {
  playerjs: null
};
export const PlayerContext = /*#__PURE__*/createContext([initialState, () => initialState]);

const setPlayerjs = payload => ({
  payload: payload,
  type: 'SET_PLAYERJS'
});

const PlayerjsEvents = (event, id, data) => {
  window.postMessage({
    event,
    id,
    payload: data,
    type: 'playerjs'
  }, '*');
};

const id = createGuid();
export const PlayerProvider = ({
  src,
  player,
  onLoad,
  eventsApiMethodName = 'PlayerjsEvents',
  children,
  ...args
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (!window[eventsApiMethodName]) {
      window[eventsApiMethodName] = PlayerjsEvents;
    }

    if (!state.playerjs && window.Playerjs) {
      dispatch(setPlayerjs(window.Playerjs));
    }
  });

  const onLoadInner = event => {
    dispatch(setPlayerjs(window.Playerjs));
    return onLoad && onLoad(event);
  };

  return /*#__PURE__*/React.createElement(PlayerContext.Provider, {
    value: [state, dispatch]
  }, /*#__PURE__*/React.createElement(Script, _extends({
    id: id,
    src: player || src,
    onLoad: onLoadInner
  }, args)), children);
};