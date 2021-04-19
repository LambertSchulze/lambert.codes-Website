import                   'styles/global.css'
import   Head       from 'next/head'
import   MainNav    from 'components/mainnav'
import { AppProps } from 'next/app'


export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>𐌋𐌂</text></svg>" />
      </Head>

      <MainNav />
      <Component {...pageProps} />
    </>
  )
}