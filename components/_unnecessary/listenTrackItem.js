import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ListenTrackItem ({track, currentTrack, index, setTrackIndex}) {

    return (
        <li className={`player__nav__item${currentTrack === track ? ' player__nav__item--selected':''}`} 
        onClick={() => setTrackIndex(index)}
        >
          <h2>{track.content.title}</h2> 
          <p>{track.content.linked_project.content.client}</p>
          <Link href={`/projects/${track.content.linked_project.slug}`}>View project</Link>
          <span className='player__nav__item__playing'>{currentTrack === track ? 'Playing':'Play'}</span>
        </li>
    )
}