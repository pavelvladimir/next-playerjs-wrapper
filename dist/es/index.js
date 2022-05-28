import { usePlayerRef } from './Player'; // eslint-disable-next-line react-hooks/rules-of-hooks

export const getPlayer = () => usePlayerRef(true);
export { Player, usePlayerRef } from './Player';
export { PlayerProvider } from './PlayerProvider';