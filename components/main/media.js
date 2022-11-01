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
    });

    useEffect(() => {
        if(!isImage(src)) {
            if(inView) videoElement.current.play();
            else videoElement.current.pause();
        }
    }, [inView])

    const resize = (image, option) => {
        var imageService = 'https://img2.storyblok.com/'
        var path = image.replace('https://a.storyblok.com', '')
        return imageService + option + path
    }

    const isImage = (string) => {
        return string.indexOf('.png') > -1 || string.indexOf('.jpeg') > -1 || string.indexOf('.jpg') > -1;
    }

    return (
        <div className='media' ref={ref} style={{opacity: inView ? 1:0}}>
        {
            isImage(src) ? <Image data={src} inView={inView}/>
            : <video muted loop ref={videoElement} playsInline poster={poster ? resize(poster, '10x'):undefined}>
                <source src={src}/>
            </video>
        }
        </div>
    )
}


export default Media
