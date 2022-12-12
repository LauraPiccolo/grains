
import React, { useEffect, useState } from "react";
import { render } from "storyblok-rich-text-react-renderer";
import Image from "../utils/image";
// import Vimeo from '@u-wave/react-vimeo';

export default function SupportingVideoItem({ video}) {

    console.log(video.poster)

  return (
    <div className="project__supporting__item" onClick={() => console.log('play fullscreen')}>
        {video.poster && <Image data={video.poster} />}
        <div className="project__supporting__description">{render(video.description)}</div>
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
