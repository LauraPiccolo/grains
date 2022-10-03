import 'intersection-observer'

import '../components/reset.css'
import '../components/utils/image.css'
import '../components/block/blocks.scss'

import '../components/style.css'
import '../components/header/header.scss'
import '../components/information/information.scss'

/* Do feature detection, to figure out which polyfills needs to be imported. */
async function loadPolyfills() {
  if (typeof window.IntersectionObserver === 'undefined') {
    await import('intersection-observer')
  }
}


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
