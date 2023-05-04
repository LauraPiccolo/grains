import React, { useEffect, useState } from 'react';

export default function ListenFooter ({currentTrack, setTrackIndex, trackList, muted, setMuted, progress, thisAudio, trackIndex, setNavOpen}) {


    const nextTrack = () => {
        setTrackIndex((trackIndex) => trackIndex + 1 >= trackList.length ? 0 : trackIndex + 1);
    }
    const prevTrack = () => {
        setTrackIndex((trackIndex) => trackIndex - 1 < 0 ? trackList.length -1 : trackIndex - 1);
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
        <footer>
            <div className='footer__data'>
                {/* <h2 className='footer__data__title'>{currentTrack.content.title}</h2> */}
                {/* <Link href={currentTrack.content.linked_project.slug}><h3 className='footer__data__client'>Client</h3></Link> */}
                <nav className='footer__data__nav'>
                    <p onClick={() => setNavOpen(true)}>{trackIndex + 1}/{trackList.length}</p>
                    <button className='footer__data__nav__prev' onClick={prevTrack}><img src="/img/prev.svg"/></button>
                    <button className='footer__data__nav__play' onClick={playTrack}><img src={`/img/${playing? 'pause':'play'}.svg`}/></button>
                    <button className='footer__data__nav__next' onClick={nextTrack}><img src="/img/next.svg"/></button>
                    <button className='footer__data__nav__mute' onClick={() => setMuted(!muted)}><img src={`/img/${muted? 'unmute':'mute'}.svg`}/></button>
                </nav>
            </div>
        </footer>
    )
}