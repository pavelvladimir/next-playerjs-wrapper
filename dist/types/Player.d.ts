import React from 'react';
import { PlayerProps, PlayerInterface } from './types';
export declare const Player: React.ForwardRefExoticComponent<Pick<PlayerProps, keyof PlayerProps> & React.RefAttributes<PlayerInterface>>;
export declare const getPlayer: () => (PlayerInterface | ((ref: PlayerInterface | null) => void))[];
