
import React, { useEffect, useRef, useState } from "react";
import { render } from "storyblok-rich-text-react-renderer";
import Cursor from "../cursor/cursor";
import Image from "../utils/image";
// import Vimeo from '@u-wave/react-vimeo';

export default function SupportingVideoItem({ video, setFullscreenUrl}) {

  const thisPoster = useRef(null)
  console.log(video.vimeo_link)

  return (
    <div className="project__supporting__item" onClick={() => setFullscreenUrl(video.vimeo_link.url)}>
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
