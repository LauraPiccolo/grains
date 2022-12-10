import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ListenTrackItem ({track, currentTrack, index, setTrackIndex}) {

    return (
        <li className={`player__nav__item${currentTrack === track ? ' player__nav__item--selected':''}`} 
        onClick={() => setTrackIndex(index)}
        >
          <h2>{track.content.title}</h2> 
          <p>Client</p>
          <Link href="/project/1">View project</Link>
          {currentTrack === track && <span className='player__nav__item__playing'>Playing</span>}
        </li>
    )
}