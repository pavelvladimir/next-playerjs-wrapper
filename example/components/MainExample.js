import React from 'react'
import { Player, getPlayer } from 'next-playerjs-wrapper'

export const MainExample = () => {
  const [playerRef, player] = getPlayer()

  const play = (event) => {
    event.preventDefault()
    if (player.isReady) player.api('play')
  }

  const btnStyle = {
    borderRadius: '1rem', color: '#fff', display: 'inline-block', padding: ' 0.5rem 1rem', textDecoration: 'none',
  }

  return (
    <>
      <div style={{ margin: '0 auto', maxWidth: '830px', width: '80%' }}>
        <Player ref={playerRef} id='main-player' file='https://plrjs.com/sample.mp4'/>
      </div>

      <div style={{ margin: '1rem auto', textAlign: 'center' }} >
        <a href='#' style={{ backgroundColor: player.isReady ? '#ff0002' : '#000', ...btnStyle }} onClick={play}>
            Click for play!
        </a>
      </div>
    </>
  )
}

