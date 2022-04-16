import React, { useContext, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
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

const PlayerComponent = /*#__PURE__*/forwardRef((props, ref) => {
  const [state] = useContext(PlayerContext);
  const [player, setPlayer] = useState(null);
  useImperativeHandle(ref, () => player && {
    api: (...args) => player.api(...args),
    event: (event, listener) => subscribe({
      event,
      id: props.id,
      listener
    }),
    isReady: true
  } || {
    isReady: false
  });
  useEffect(() => {
    if (state.playerjs && !player) {
      setPlayer(new state.playerjs(props));
    }

    return () => {
      if (player) player.api('destroy');

      for (const listener of listeners[props.id] || []) {
        listener();
      }
    };
  }, [state.playerjs]);
  return /*#__PURE__*/React.createElement("div", {
    id: props.id
  });
});
PlayerComponent.displayName = 'Player';
export const Player = PlayerComponent;