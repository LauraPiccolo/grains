import '../components/reset.css'
import '../components/utils/image.css'
import '../components/style.css'
import '../components/listen/listen.scss';
import '../components/pageBlocks/blocks.scss';
import '../components/header/header.scss';
import '../components/footer/footer.scss';
import '../components/contact/contact.scss';
import '../components/about/about.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"

function MyApp({ Component, pageProps }) {

  return (
      <Component {...pageProps} />
  )
}

export default MyApp
