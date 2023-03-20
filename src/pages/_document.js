import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/bluebird-favicon.ico" />
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=roboto:500,700,900" rel="stylesheet" />
      </Head>
      <body className="pattern font-roboto">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
