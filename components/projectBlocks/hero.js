
import Vimeo from '@u-wave/react-vimeo';
import React, { useEffect, useState } from "react";
import HeroFooter from './heroFooter';

export default function Hero({ url }) {

    const [muted, setMuted] = useState(false)
    const [currentTiming, setCurrentTiming] = useState(0) 
    const [paused, setPaused] = useState(true);

  return (
    <div className="project__hero" onClick={() => {console.log('play!'); setPaused(!paused)}}>
          <Vimeo
                video={url}
                paused={paused}
                controls={false}
                muted={muted}
                volume={muted ? 0 : 1}
                onTimeUpdate={(props) => setCurrentTiming(Math.round(props.seconds))}
            />
            <HeroFooter 
                muted={muted}
                setMuted={setMuted}
                currentTiming={currentTiming}
                setCurrentTiming={currentTiming}
            />
    </div>
  );
}
