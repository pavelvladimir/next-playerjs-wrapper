import React, { createContext, useReducer, useEffect } from 'react'
import Script, { ScriptProps } from 'next/script'
import { v4 as createGuid } from 'uuid'

import { PlayerProps, Playerjs, PlayerId } from './types'

type PlayerjsEventsFunction = (event: string, id: PlayerId, data: any) => void

declare global {
  interface Window {
    [key: string]: any
    Playerjs: PlayerConstructor
    PlayerjsEvents?: PlayerjsEventsFunction
  }
}

interface PlayerProviderProps extends ScriptProps {
  children?: React.ReactNode
  eventsApiMethodName?: string
  player?: string
}

interface PlayerConstructor {
  new (...args: Array<PlayerProps>): Playerjs
}

type PlayerProviderState = {
  playerjs: PlayerConstructor | null
}

type PlayerProviderAction = {
  payload: PlayerConstructor
  type: 'SET_PLAYERJS'
}

const reducer: React.Reducer<PlayerProviderState, PlayerProviderAction> = (
  state: PlayerProviderState,
  action: PlayerProviderAction,
) => {
  switch (action.type) {
    case 'SET_PLAYERJS':
      return {
        ...state,
        playerjs: action.payload,
      }
    default:
      return state
  }
}

const initialState: PlayerProviderState = {
  playerjs: null,
}

export const PlayerContext = createContext<[PlayerProviderState, React.Dispatch<PlayerProviderAction>]>([
  initialState,
  () => initialState,
])

const setPlayerjs = (payload: PlayerConstructor): PlayerProviderAction => ({
  payload: payload,
  type: 'SET_PLAYERJS',
})

const PlayerjsEvents: PlayerjsEventsFunction = (event, id, data) => {
  window.postMessage({ event, id, payload: data, type: 'playerjs' }, '*')
}

const id = createGuid()

export const PlayerProvider = ({
  src,
  player,
  onLoad,
  eventsApiMethodName = 'PlayerjsEvents',
  children,
  ...args
}: PlayerProviderProps) => {
  const [state, dispatch] = useReducer<React.Reducer<PlayerProviderState, PlayerProviderAction>>(reducer, initialState)

  useEffect(() => {
    if (!window[eventsApiMethodName]) {
      window[eventsApiMethodName] = PlayerjsEvents
    }

    if (!state.playerjs && window.Playerjs) {
      dispatch(setPlayerjs(window.Playerjs))
    }
  })

  const onLoadInner = (event: any) => {
    dispatch(setPlayerjs(window.Playerjs))
    return onLoad && onLoad(event)
  }

  return (
    <PlayerContext.Provider value={[state, dispatch]}>
      <Script id={id} src={player || src} onLoad={onLoadInner} {...args} />
      {children}
    </PlayerContext.Provider>
  )
}
