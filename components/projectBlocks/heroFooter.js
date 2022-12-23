import React, { useEffect, useState } from 'react';

export default function HeroFooter ({muted, setMuted, progress, currentTiming, paused, setPaused, back=false, closeFullscreen}) {

    const formatTiming = (timing) => {
        const minutes = Math.trunc(timing / 60);
        const seconds = Math.trunc(timing % 60);
        return `${minutes < 10 ? `0${minutes}`:minutes}:${seconds < 10 ? `0${seconds}`:seconds}`;
    }

    return (
        <footer>
            <div className='footer__data--project'>
                {back && <button className='footer__data__close'
                onClick={() => closeFullscreen(undefined)}
                >
                    Back
                </button>}
                <button className='footer__data__play'
                onClick={() => setPaused(!paused)}
                >{paused ? 'Play':'Pause'}</button>
                <nav className='footer__data__nav'>
                    <button className='footer__data__nav__next'>{formatTiming(currentTiming)}</button>
                    <button className='footer__data__nav__mute' onClick={(event) => {event.stopPropagation();setMuted(!muted)}}>{muted ? 'Unmute':'Mute'}</button>
                    <div className='footer__data__wave'>
                        <img src='/img/wave.svg' />
                    </div>
                </nav>
            </div>
            <div className='footer__progress'>
                <div className='footer__progress__played' style={{width: `${progress}%`}}/>
            </div>
        </footer>
    )
}