import { Player, getPlayer } from './Player';
import { PlayerProvider } from './PlayerProvider';
declare type ApiFunction = (command: string, parameter?: any, value?: any) => void;
export declare type PlayerId = string;
export declare type PlayerProps = {
    [x: string]: any;
    file: string;
    id: PlayerId;
};
export interface PlayerInterface {
    api?: ApiFunction;
    event?: (event: string, listener: EventListener) => void;
    isReady: boolean;
}
export declare type Playerjs = {
    [x: string]: any;
    api: ApiFunction;
};
export { Player, getPlayer, PlayerProvider, };
