import { Player, usePlayerRef } from './Player';
import { PlayerProvider } from './PlayerProvider';
declare type ApiFunction = (command: string, parameter?: any, value?: any) => any;
export declare type PlayerId = string;
export declare type PlayerProps = {
    [x: string]: any;
    file: string;
    id: PlayerId;
};
export interface PlayerInterface {
    api?: ApiFunction;
    event?: (event: string, listener: EventListener) => () => void;
    isReady: boolean;
}
export declare type Playerjs = {
    [x: string]: any;
    api: ApiFunction;
};
declare const getPlayer: () => [(ref: PlayerInterface | null) => void, PlayerInterface];
export { Player, getPlayer, usePlayerRef, PlayerProvider };
