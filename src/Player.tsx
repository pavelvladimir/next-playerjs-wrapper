import React, {
  useContext,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react'

import { PlayerContext } from './PlayerProvider'
import { PlayerProps, Player as PlayerInterface, Playerjs, PlayerId } from './types'

const listeners: {
  [P in string]?: Array<() => void>
} = {}

type Subscribe = (data: { event: string, id: PlayerId, listener: EventListener }) => void

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

const PlayerComponent = forwardRef((props: PlayerProps, ref: React.Ref<PlayerInterface>) => {
  const [state] = useContext(PlayerContext)
  const [player, setPlayer] = useState<Playerjs | null>(null)

  useImperativeHandle(
    ref,
    () =>
      player && {
        api: (...args) => player.api(...args),
        event: (event, listener) => subscribe({ event, id: props.id, listener }),
        isReady: true,
      } || { isReady: false },
  )

  useEffect(() => {
    if (state.playerjs && !player) {
      setPlayer(new state.playerjs(props))
    }

    return () => {
      if (player) player.api('destroy')
      for (const listener of (listeners[props.id] || [])) {
        listener()
      }
    }
  }, [state.playerjs])

  return <div id={props.id}></div>
})

PlayerComponent.displayName = 'Player'

export const Player = PlayerComponent
