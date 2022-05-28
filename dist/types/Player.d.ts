import React from 'react';
import { PlayerProps, PlayerInterface } from './types';
export declare const Player: React.MemoExoticComponent<React.ForwardRefExoticComponent<Pick<PlayerProps, keyof PlayerProps> & React.RefAttributes<PlayerInterface>>>;
export declare const usePlayerRef: (callFromDeprecatedFunction?: boolean) => [(ref: PlayerInterface | null) => void, PlayerInterface];
