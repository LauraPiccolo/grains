import React from 'react'
import Image from '../utils/image';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const Media = ({src, poster}) => {

    const videoElement = useRef()

    const { ref, inView, entry } = useInView({
        threshold: 0.1,
        trackVisibility: true,
        delay: 100,
        triggerOnce: true
    });

    useEffect(() => {
        if(!isImage(src)) {
            if(inView) videoElement.current.play();
            else videoElement.current.pause();
        }
    }, [inView])

    const isImage = (string) => {
        return string.indexOf('.png') > -1 || string.indexOf('.jpeg') > -1 || string.indexOf('.jpg') > -1;
    }

    return (
        <div className='media' ref={ref} style={{opacity: inView ? 1:0}}>
        {
            isImage(src) ? <Image data={src} inView={inView}/>
            : <video muted loop ref={videoElement}>
                <source src={src} poster={poster}/>
            </video>
        }
        </div>
    )
}


export default Media
