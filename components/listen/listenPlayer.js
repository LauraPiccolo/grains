import React, { useEffect, useRef, useState } from 'react';
import ListenFooterIntro from './listenFooterIntro';
import ListenFooter from './listenFooter';
import ListenNav from './listenNav';
import ListenVisualWrapper from './listenVisualWrapper';
import Cursor from '../cursor/cursor';
// import StoryblokClient from "storyblok-js-client";

export default function ListenPlayer ({ intro, trackList, setFirstPlay, firstPlay }) {

    const thisAudio = useRef(null);
    const [trackIndex, setTrackIndex] = useState(0);
    const [muted, setMuted] = useState(0);
    const [progress, setProgress] = useState(0);
    const progressIntervalRef = useRef(null)
    const [navOpen, setNavOpen] = useState(false);

    useEffect(() => {
        setProgress(0);
        thisAudio.current.src = trackList[trackIndex].content.file.filename;
        thisAudio.current.load();
        thisAudio.current.play();
        startProgress();
    }, [trackIndex])

    const startProgress = () => {
        if(progressIntervalRef.current) clearInterval(progressIntervalRef.current)
        progressIntervalRef.current = setInterval(() => {
            if(thisAudio.current) {
                if(thisAudio.current.currentTime === thisAudio.current.duration) setTrackIndex(trackIndex + 1 >= trackList.length ? 0 : trackIndex + 1)
                setProgress((thisAudio.current.currentTime / thisAudio.current.duration)*100);
            }
        }, 100)
    }

    return (
        <main className='audio-player'>
           <ListenVisualWrapper track={trackList[trackIndex].content.file.filename} thisAudio={thisAudio} intro={!intro} setNavOpen={setNavOpen} navOpen={navOpen} firstPlay={firstPlay} setFirstPlay={setFirstPlay}/>
           {intro ?
           <ListenFooterIntro currentTrack={trackList[trackIndex]} setTrackIndex={setTrackIndex} trackList={trackList} setMuted={setMuted} muted={muted} progress={progress} thisAudio={thisAudio}/>
           :
           !firstPlay && <ListenFooter setNavOpen={setNavOpen} currentTrack={trackList[trackIndex]} trackIndex={trackIndex} setTrackIndex={setTrackIndex} trackList={trackList} setMuted={setMuted} muted={muted} progress={progress} thisAudio={thisAudio}/>
           }
           <audio className='audio-player__audio' ref={thisAudio} muted={muted}>
                <source src={trackList[trackIndex].content.file.filename} />
                {/* <source src={'/sound/test.mp3'} /> */}
            </audio>
            {!intro && <ListenNav navOpen={navOpen} trackList={trackList} currentTrack={trackList[trackIndex]} setTrackIndex={setTrackIndex}/>}
        </main>
    )
}