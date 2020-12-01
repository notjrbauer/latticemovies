import '../styles/globals.css'

import {ReactQueryCacheProvider, QueryCache} from 'react-query'
import {Hydrate} from 'react-query/hydration'

const queryCache = new QueryCache()

export default function MyApp({Component, pageProps}) {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </ReactQueryCacheProvider>
  )
}
