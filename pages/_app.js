import 'intersection-observer'

import '../components/reset.css'
import '../components/utils/image.css'
import '../components/main/main.scss'

import '../components/style.css'
import '../components/header/header.scss'
import '../components/information/information.scss'
import 'locomotive-scroll/dist/locomotive-scroll.css';
import '../components/intro/intro.scss';
import '../components/popup/popup.scss';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import { LocomotiveScrollProvider as RLSProvider } from 'react-locomotive-scroll';

import { useEffect } from 'react'

/* Do feature detection, to figure out which polyfills needs to be imported. */
async function loadPolyfills() {
  if (typeof window.IntersectionObserver === 'undefined') {
    await import('intersection-observer')
  }
}


function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();
  const containerRef = useRef(null);

  return (
    // <RLSProvider
    //   options={{
    //     smooth: true,
    //     lerp: 0.05,
    //     mobile: {
    //       smooth: true,
    //       lerp: 0.05,
    //     },
    //     tablet: {
    //         smooth: true,
    //         lerp: 0.05,
    //     }
    //     // ... all available Locomotive Scroll instance options
    //   }}
    //   watch={
    //     [
    //       //..all the dependencies you want to watch to update the scroll.
    //       //  Basicaly, you would want to watch page/location changes
    //       //  For exemple, on Next.js you would want to watch properties like `router.asPath` (you may want to add more criterias if the instance should be update on locations with query parameters)
    //     ]
    //   }
    //   location={asPath}
    //   onLocationChange={(scroll) => scroll.scrollTo(0, { duration: 0, disableLerp: true })}
    //   containerRef={containerRef}
    // >
    //   <div data-scroll-container ref={containerRef}>
      <Component {...pageProps} />
    //   </div>
    // </RLSProvider>
    // // {/* </main> */}
  )
}

export default MyApp
