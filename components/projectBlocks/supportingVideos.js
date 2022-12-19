
import React, { useEffect, useState } from "react";
import SupportingVideoItem from "./supportingVideoItem";

export default function SupportingVideos({ videoList}) {

  return (
    <div className="project__supporting">
        <h3>Supporting videos</h3>
        <ul>{
            videoList.map((video, index) => (
                <li  key={`supporting--${index}`}>
                   <SupportingVideoItem video={video} />
                </li>
            ))
            }</ul>
    </div>
  );
}
