import React, { useContext, useState, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react';
import { PlayerContext } from './PlayerProvider';
const listeners = {};

const subscribe = ({
  id,
  event: listenedEvent,
  listener
}) => {
  const messageEventHandler = event => {
    const {
      event: innerEvent,
      id,
      payload,
      type
    } = event.data || {};

    if (type === 'playerjs' && id === id && innerEvent === listenedEvent) {
      listener(payload);
    }
  };

  window.addEventListener('message', messageEventHandler);

  const detachEventListener = () => {
    window.removeEventListener('message', messageEventHandler);
  };

  listeners[id] = (listeners[id] || []).concat(detachEventListener);
  return detachEventListener;
};

const defaultPlayerState = {
  isReady: false
};
const PlayerComponent = /*#__PURE__*/forwardRef((props, ref) => {
  const [state] = useContext(PlayerContext);
  const [initialProps, setInitialProps] = useState(null);
  const [player, setPlayer] = useState(null);
  useImperativeHandle(ref, () => player && {
    api: (...args) => player.api(...args),
    event: (event, listener) => subscribe({
      event,
      id: initialProps.id,
      listener
    }),
    isReady: true
  } || defaultPlayerState, [initialProps, player]);
  useEffect(() => {
    if (state.playerjs && initialProps != null && !player) {
      setPlayer(new state.playerjs(initialProps));
    }

    return () => {
      if (player) player.api('destroy');

      if (initialProps != null) {
        for (const listener of listeners[initialProps.id] || []) {
          listener();
        }
      }
    };
  }, [player, initialProps, state.playerjs]);
  useEffect(() => {
    if (initialProps === null && props.id != null) {
      setInitialProps(props);
    } else if (initialProps === null && props.id == null) {
      console.warn(`Missing mandatory property 'id'!`);
    }
  }, [initialProps, props]);
  return /*#__PURE__*/React.createElement("div", {
    id: props.id
  });
});
PlayerComponent.displayName = 'Player';
export const Player = /*#__PURE__*/React.memo(PlayerComponent, () => true);
export const usePlayerRef = (callFromDeprecatedFunction = false) => {
  if (callFromDeprecatedFunction) {
    console.warn('The getPlayer function is deprecated, please use the usePlayerRef function.');
  }

  const [player, setPlayer] = useState(defaultPlayerState);
  const setRef = useCallback(ref => {
    if (ref != null) setPlayer(ref);
  }, []);
  return [setRef, player];
};