import React, { useState, useRef, useEffect } from 'react'
import { Player, getPlayer } from 'next-playerjs-wrapper'

const FixedScrollPosition = () => {
  const elementRef = useRef()
  useEffect(() => elementRef.current.scrollIntoView())
  return <div ref={elementRef} />
}

export const AutoplayExample = () => {
  const [log, setLog] = useState([])
  const [playerRef, player] = getPlayer()

  useEffect(() => {
    console.log(player)
    if (player.isReady) {
      player.event('play', () => {
        setLog((log) => [...log, 'Play!!!'])
      })

      player.event('pause', () => {
        setLog((log) => [...log, 'Pause!!!'])
      })

      const timeListener = player.event('time', (...args) => {
        setLog((log) => [...log, `Time: ${args[0]}s`])
      })

      player.api('play')

      // eslint-disable-next-line no-undef
      setTimeout(() => {
        timeListener()
        setLog((log) => [...log, 'Time listener has been removed!!!'])
      }, 5000)
    }
  }, [player])

  return (
    <>
      <div style={{ margin: '0 auto', maxWidth: '830px', width: '80%' }}>
        <Player ref={playerRef} id="autoplay-player" file="https://plrjs.com/sample.mp4" />
      </div>

      <div
        style={{
          margin: '1rem auto',
          maxHeight: '30vh',
          maxWidth: '830px',
          overflow: 'scroll',
          width: '80%',
        }}
      >
        {log.map((item, i) => (
          <p key={i}>
            {i + 1}. {item}
          </p>
        ))}
        <FixedScrollPosition />
      </div>
    </>
  )
}
