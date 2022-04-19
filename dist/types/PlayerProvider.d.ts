import React from 'react';
import { ScriptProps } from 'next/script';
import { PlayerProps, Playerjs, PlayerId } from './types';
declare type PlayerjsEventsFunction = (event: string, id: PlayerId, data: any) => void;
declare global {
    interface Window {
        [key: string]: any;
        Playerjs: PlayerConstructor;
        PlayerjsEvents?: PlayerjsEventsFunction;
    }
}
interface PlayerProviderProps extends ScriptProps {
    children?: React.ReactNode;
    eventsApiMethodName?: string;
    player?: string;
}
interface PlayerConstructor {
    new (...args: Array<PlayerProps>): Playerjs;
}
declare type PlayerProviderState = {
    playerjs: PlayerConstructor | null;
};
declare type PlayerProviderAction = {
    payload: PlayerConstructor;
    type: 'SET_PLAYERJS';
};
export declare const PlayerContext: React.Context<[PlayerProviderState, React.Dispatch<PlayerProviderAction>]>;
export declare const PlayerProvider: ({ src, player, onLoad, eventsApiMethodName, children, ...args }: PlayerProviderProps) => JSX.Element;
export {};
