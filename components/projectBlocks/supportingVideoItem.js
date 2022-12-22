
import React, { useEffect, useRef, useState } from "react";
import { render } from "storyblok-rich-text-react-renderer";
import Cursor from "../cursor/cursor";
import Image from "../utils/image";
// import Vimeo from '@u-wave/react-vimeo';

export default function SupportingVideoItem({ video}) {

  const thisPoster = useRef(null)

  return (
    <div className="project__supporting__item" onClick={() => console.log('play fullscreen')}>
        <div className="project__supporting__image" ref={thisPoster}>
        {video.poster && <Image data={video.poster}/>}
        </div>
        <div className="project__supporting__description">{render(video.description_text)}</div>
        <Cursor text="Fullscreen" parent={thisPoster} />
        {/* <Vimeo
                video={url}
                paused={paused}
                controls={false}
                muted={muted}
                volume={muted ? 0 : 1}
        /> */}
    </div>
  );
}
