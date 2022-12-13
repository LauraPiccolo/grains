import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ListenFooterIntro ({currentTrack, setTrackIndex, trackList, muted, setMuted, progress, thisAudio}) {

    const nextTrack = (event) => {
        setTrackIndex((trackIndex) => trackIndex + 1 >= trackList.length ? 0 : trackIndex + 1);
    }
    const playTrack = () => {
        if(thisAudio.current.paused)  {
            thisAudio.current.play()
            setPlaying(true);
        }
        else {
            thisAudio.current.pause()
            setPlaying(false);
        }
    }

    const [playing, setPlaying] = useState(false);

    return (
        <footer onClick={(event) => event.stopPropagation()}>
            <div className='footer__data footer__data--intro'>
                <h2 className='footer__data__title'>{currentTrack.content.title}</h2>
                <Link href={`/projects/${currentTrack.content.linked_project.slug}`}><h3 className='footer__data__client'>{currentTrack.content.linked_project.content.client}</h3></Link>
                <nav className='footer__data__nav'>

                    <button className='footer__data__nav__play' onClick={playTrack}>{playing? 'Pause':'Play'} Track</button>
                    <button className='footer__data__nav__next' onClick={nextTrack}>Next Track</button>
                    <button className='footer__data__nav__mute' onClick={() => setMuted(!muted)}>{muted ? 'Unmute':'Mute'}</button>
                </nav>
                <div className='footer__data__wave'>
                    <img src='/audio.gif' />
                </div>
            </div>
            <div className='footer__progress'>
                <div className='footer__progress__played' style={{width: `${progress}%`}}/>
            </div>
        </footer>
    )
}