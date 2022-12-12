
import React, { useEffect, useState } from "react";
import SupportingVideoItem from "./supportingVideoItem";

export default function SupportingVideos({ videoList}) {

  return (
    <div className="project__supporting">
        <h3>Supporting videos</h3>
        <ul>{
            videoList.map((video) => (
                <li>
                   <SupportingVideoItem video={video} />
                </li>
            ))
            }</ul>
    </div>
  );
}
