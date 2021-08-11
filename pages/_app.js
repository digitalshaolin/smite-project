import { useEffect } from 'react'
import { useRouter } from 'next/router'

import '../styles/globals.scss'
import Layout from '../components/layout'
import * as ga from '../lib/ga'

function MyApp({ Component, pageProps }) {

  const router = useRouter();

  useEffect(() => {
    const handeRouteChange = (url) => {
      ga.pageview(url)
    }
    router.events.on('routeChangeComplete', handeRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handeRouteChange)
    }
  }, [router.events])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
