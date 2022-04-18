# next-playerjs-wrapper

Next.js wrapper for [playerjs.com](https://playerjs.com/).

Check out the [Live Example](https://next-playerjs-wrapper.vercel.app/) to try it for yourself.

## Install

```bash
$ yarn add next-playerjs-wrapper
```

## Use

You'll need a [Custom `App`](https://nextjs.org/docs/advanced-features/custom-app) to use next-playerjs-wrapper . The simple `_app` looks like this:

```js
import { PlayerProvider } from "next-playerjs-wrapper";

function MyApp({ Component, pageProps }) {
  return (
    <PlayerProvider player="/playerjs.js">
      <Component {...pageProps} />
    </PlayerProvider>
  );
}

export default MyApp;
```

### Player

You can simply paste the player into the page:

```js
import { Player } from "next-playerjs-wrapper";

export const SomePage = () => (
  <div>
    <Player id="my-player" file="https://plrjs.com/sample.mp4" />
  </div>
);
```

> You can add any props on Player component you want playerjs constructor to process.

### Commands JS API & Events JS API

You can use [Commands JS API](https://playerjs.com/docs/en=apicommands) or [Events JS API](https://playerjs.com/docs/en=api) using the `getPlayer` reference hook.

```js
import { Player, getPlayer } from 'next-playerjs-wrapper'

export const SomePage = () => {
  const [playerRef, player] = getPlayer()

  const  play = (event) => {
    event.preventDefault()
    if (player.isReady) player.api('play')
  }

  return (
    <div>
      <Player ref={playerRef} id='my-player' file='https://plrjs.com/sample.mp4'/>
      <a href='#' onClick={play}>Click for play!</a>
    </div>
  )
)
```

> For more examples, see [source](https://github.com/pavelvladimir/next-playerjs-wrapper/tree/main/example) of example page.
