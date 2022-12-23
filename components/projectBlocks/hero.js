
import Vimeo from '@u-wave/react-vimeo';
import React, { useEffect, useRef, useState } from "react";
import Cursor from '../cursor/cursor';
import HeroFooter from './heroFooter';

export default function Hero({ url, setFullscreenUrl, setHeroTiming, heroTiming, fullscreenUrl, updateTiming }) {

  const [muted, setMuted] = useState(false)
  const [currentTiming, setCurrentTiming] = useState(0)
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const vimeoRef = useRef(null)
  const [player, setPlayer] = useState(null)

  const handleEnd = () => {
    setPaused(true);
  }

  const handleReady = (player) => {
    setPlayer(player)
  }

  useEffect(() => {
    if(player !== null && updateTiming) player.setCurrentTime(heroTiming)
  }, [updateTiming])

  return (
    <div className="project__hero">
      <div className='vimeo-wrapper'
        ref={vimeoRef}
        onClick={() => {
          setFullscreenUrl(url)
          setTimeout(() => setPaused(true)), 500;
        }}
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
            setHeroTiming(Math.round(props.seconds))
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
      />
      <Cursor text="Fullscreen" parent={vimeoRef} />
    </div>
  );
}
