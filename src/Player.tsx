import React, { useContext, useState, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react'

import { PlayerContext } from './PlayerProvider'
import { PlayerProps, PlayerInterface, Playerjs, PlayerId } from './types'

const listeners: {
  [P in string]?: Array<() => void>
} = {}

type Subscribe = (data: { event: string; id: PlayerId; listener: EventListener }) => () => void

const subscribe: Subscribe = ({ id, event: listenedEvent, listener }) => {
  const messageEventHandler = (event: any) => {
    const { event: innerEvent, id, payload, type } = event.data || {}

    if (type === 'playerjs' && id === id && innerEvent === listenedEvent) {
      listener(payload)
    }
  }

  window.addEventListener('message', messageEventHandler)

  const detachEventListener = () => {
    window.removeEventListener('message', messageEventHandler)
  }

  listeners[id] = (listeners[id] || []).concat(detachEventListener)

  return detachEventListener
}

const defaultPlayerState: PlayerInterface = { isReady: false }

const PlayerComponent = forwardRef((props: PlayerProps, ref: React.Ref<PlayerInterface>) => {
  const [state] = useContext(PlayerContext)
  const [initialProps, setInitialProps] = useState<PlayerProps | null>(null)
  const [player, setPlayer] = useState<Playerjs | null>(null)

  useImperativeHandle(
    ref,
    () =>
      (player && {
        api: (...args) => player.api(...args),
        event: (event, listener) => subscribe({ event, id: initialProps!.id, listener }),
        isReady: true,
      }) ||
      defaultPlayerState,
    [initialProps, player],
  )

  useEffect(() => {
    if (state.playerjs && initialProps != null && !player) {
      setPlayer(new state.playerjs(initialProps))
    }

    return () => {
      if (player) player.api('destroy')
      if (initialProps != null) {
        for (const listener of listeners[initialProps.id] || []) {
          listener()
        }
      }
    }
  }, [player, initialProps, state.playerjs])

  useEffect(() => {
    if (initialProps === null && props.id != null) {
      setInitialProps(props)
    } else if (initialProps === null && props.id == null) {
      console.warn(`Missing mandatory property 'id'!`)
    }
  }, [initialProps, props])

  return <div id={props.id}></div>
})

PlayerComponent.displayName = 'Player'

export const Player = React.memo(PlayerComponent, () => true)

export const usePlayerRef = (
  callFromDeprecatedFunction = false,
): [(ref: PlayerInterface | null) => void, PlayerInterface] => {
  if (callFromDeprecatedFunction) {
    console.warn('The getPlayer function is deprecated, please use the usePlayerRef function.')
  }

  const [player, setPlayer] = useState(defaultPlayerState)

  const setRef = useCallback((ref: PlayerInterface | null) => {
    if (ref != null) setPlayer(ref)
  }, [])

  return [setRef, player]
}
