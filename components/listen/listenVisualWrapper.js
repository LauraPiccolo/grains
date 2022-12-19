import dynamic from 'next/dynamic'
import { Suspense, useEffect, useRef, useState } from 'react'
import Cursor from '../cursor/cursor'

const DynamicPlayer = dynamic(() => import('./listenVisual'), {
    ssr: false
  })

export default function ListenVisualWrapper({track, thisAudio, intro, navOpen, setNavOpen, firstPlay, setFirstPlay}) {

  const parent = useRef(null)

  return (
    <div ref={parent} onClick={() => {firstPlay ? setFirstPlay(false): setNavOpen(!navOpen)}}>
       <DynamicPlayer track={track} thisAudio={thisAudio} firstPlay={firstPlay}/>
       <Cursor parent={parent} text={firstPlay ? 'Play' : navOpen ? 'Fullscreen':'View tracks'} />
    </div>
  )
}