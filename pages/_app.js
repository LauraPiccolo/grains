import 'intersection-observer'

import '../components/reset.css'
import '../components/utils/image.css'
import '../components/style.css'
import '../components/grid.scss'
import '../components/header/header.scss'
import '../components/menu/menu.scss'
import '../components/footer/footer.scss'
import '../components/sections/intro/intro.scss'
import '../components/sections/contact/contact.scss'
import '../components/blocks/blocks.scss'
import '../components/impressum/impressum.scss'

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
