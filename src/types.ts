import { Player } from './Player'
import { PlayerProvider } from './PlayerProvider'

type ApiFunction = (command: string, parameter?: any, value?: any) => void

export type PlayerId = string

export type PlayerProps = {
  [x: string]: any
  file: string
  id: PlayerId
}

export interface PlayerInterface {
  api?: ApiFunction
  event?: (event: string, listener: EventListener) => void
  isReady: boolean
}

export type Playerjs = {
  [x: string]: any
  api: ApiFunction
}

export {
  Player,
  PlayerProvider,
}
