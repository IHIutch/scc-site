import { CacheProvider } from '@emotion/react'
import { RemixBrowser } from '@remix-run/react'
import { startTransition, StrictMode, useState } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { ClientStyleContext } from './content'
import createEmotionCache, { defaultCache } from './createEmotionCache'

function ClientCacheProvider({ children }) {
  const [cache, setCache] = useState(defaultCache)

  function reset() {
    setCache(createEmotionCache())
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  )
}

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <ClientCacheProvider>
          <RemixBrowser />
        </ClientCacheProvider>
      </StrictMode>
    )
  })
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate)
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1)
}
