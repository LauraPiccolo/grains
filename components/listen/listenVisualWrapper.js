import dynamic from 'next/dynamic'
import { Suspense, useEffect } from 'react'

const DynamicPlayer = dynamic(() => import('./listenVisual'), {
    ssr: false
  })

export default function ListenVisualWrapper({track, thisAudio, setPlayingStarted}) {

      useEffect(() => {
        console.log(track)
      }, [track])
  return (
    <>
      <DynamicPlayer track={track} thisAudio={thisAudio} setPlayingStarted={setPlayingStarted}/>
    </>
  )
}