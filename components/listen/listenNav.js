import React, { useEffect, useState } from 'react';
import ListenTrackItem from './listenTrackItem';

export default function ListenNav ({trackList, currentTrack, setTrackIndex, navOpen, setNavOpen}) {

    return (
        <nav className='player__nav' style={{marginLeft: navOpen ? '0vw':'-25vw'}}>
            <ul>
            {
                trackList.map((track, index) => (
                    <ListenTrackItem track={track} currentTrack={currentTrack} index={index} setTrackIndex={setTrackIndex}/>
                ))
            }
            </ul>
            <button className='player__nav__toggle' 
                // style={{left: navOpen ? 'calc(25vw + 30px)':'30px'}} 
                onClick={() => setNavOpen(!navOpen)}
            >
                {navOpen ? 'Fullscreen':'View tracks'}
            </button>
        </nav>
    )
}