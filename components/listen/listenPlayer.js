import React, { useEffect, useRef, useState } from 'react';
import ListenFooter from './listenFooter';
import ListenVisual from './listenVisual';
// import StoryblokClient from "storyblok-js-client";

export default function ListenPlayer ({ intro, trackList }) {

    const thisAudio = useRef(null);
    const [trackIndex, setTrackIndex] = useState(0);
    const [muted, setMuted] = useState(0);
    const [progress, setProgress] = useState(0);
    const progressIntervalRef = useRef(null)

    useEffect(() => {
        // console.log(trackIndex)
        setProgress(0);
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
           <ListenVisual />
           <ListenFooter currentTrack={trackList[trackIndex]} setTrackIndex={setTrackIndex} trackList={trackList} setMuted={setMuted} muted={muted} progress={progress}/>
           <audio className='audio-player__audio' ref={thisAudio} muted={muted}>
                <source src={trackList[trackIndex].content.file.filename} />
            </audio>
        </main>
    )
}