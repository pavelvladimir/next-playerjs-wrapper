import App from 'next/app'
import Head from 'next/head'
import { PlayerProvider } from 'next-playerjs-wrapper'

import 'modern-normalize/modern-normalize.css'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, maximum-scale=1.0, user-scalable=no" />
          <meta name="format-detection" content="telephone=no" />
        </Head>
        <div className="app">
          <PlayerProvider player="/playerjs.js">
            <Component {...pageProps} />
          </PlayerProvider>
        </div>
      </>
    )
  }
}

export default MyApp
