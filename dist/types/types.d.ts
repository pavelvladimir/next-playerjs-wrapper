declare type ApiFunction = (command: string, parameter?: any, value?: any) => void;
export declare type PlayerId = string;
export declare type PlayerProps = {
    [x: string]: any;
    file: string;
    id: PlayerId;
};
export interface Player {
    api?: ApiFunction;
    event?: (event: string, listener: EventListener) => void;
    isReady: boolean;
}
export declare type Playerjs = {
    [x: string]: any;
    api: ApiFunction;
};
export {};
