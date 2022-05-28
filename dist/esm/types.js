import { Player, usePlayerRef } from './Player';
import { PlayerProvider } from './PlayerProvider';

// eslint-disable-next-line react-hooks/rules-of-hooks
var getPlayer = function getPlayer() {
  return usePlayerRef(true);
};

export { Player, getPlayer, usePlayerRef, PlayerProvider };