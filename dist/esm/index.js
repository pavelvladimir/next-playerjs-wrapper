import { usePlayerRef } from './Player'; // eslint-disable-next-line react-hooks/rules-of-hooks

export var getPlayer = function getPlayer() {
  return usePlayerRef(true);
};
export { Player, usePlayerRef } from './Player';
export { PlayerProvider } from './PlayerProvider';