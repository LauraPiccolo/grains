
import Vimeo from '@u-wave/react-vimeo';
import React, { useEffect, useRef, useState } from "react";
import Cursor from '../cursor/cursor';
import HeroFooter from './heroFooter';

export default function Fullscreen ({ url, setFullscreenUrl, setHeroTiming, heroTiming, setUpdateTiming, fullscreenUrlRef }) {

  const [muted, setMuted] = useState(false)
  const [currentTiming, setCurrentTiming] = useState(0)
  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const vimeoRef = useRef(null)
  const [opacity, setOpacity] = useState(0)
  const [opacity2, setOpacity2] = useState(0)

  const handleEnd = () => {
    setPaused(true);
  }

  const closeFullscreen = () => {
    setUpdateTiming(true)
    setPaused(true)
    setOpacity2(0);
    setTimeout(() => setOpacity(0), 500);
    setTimeout(() => {
        setFullscreenUrl(undefined)
        setUpdateTiming(false)
    }, 1000);
  }

  const openFullscreen = () => {
    setTimeout(() => setOpacity(1), 100);
  }

  useEffect(() => {
    openFullscreen()
  }, [url])

  const handleReady = (player) => {
    if(fullscreenUrlRef === url) player.setCurrentTime(heroTiming)
    setTimeout(() => setPaused(false), 1000);
    setTimeout(() => setOpacity2(1), 1500);
  }

  return (
    <div className="project__fullscreen" style={{opacity: opacity}}>
      <div className='vimeo-wrapper'
        ref={vimeoRef}
        onClick={() => { console.log('play!'); setPaused(!paused) }}
        style={{opacity: opacity2}}
      >
        <Vimeo
          video={url}
          paused={paused}
          controls={false}
          muted={muted}
          volume={muted ? 0 : 1}
          onTimeUpdate={(props) => {
            setProgress(props.percent * 100)
            setCurrentTiming(Math.round(props.seconds))
            if(fullscreenUrlRef === url) setHeroTiming(Math.round(props.seconds))
          }}
          onEnd={handleEnd}
          className="vimeo"
          onReady={handleReady}
        />
      </div>
      <HeroFooter
        muted={muted}
        setMuted={setMuted}
        currentTiming={currentTiming}
        setCurrentTiming={currentTiming}
        paused={paused}
        setPaused={setPaused}
        progress={progress}
        back={true}
        closeFullscreen={closeFullscreen}
      />
      <Cursor text={paused ? 'Play':'Pause'} parent={vimeoRef} />
    </div>
  );
}
