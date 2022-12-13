import React, { useEffect, useRef, useState } from 'react';
import Image from '../utils/image'
import { useInView } from 'react-intersection-observer';

export default function ProjectItemMedia ({item}) {

    const [enteredOnce, setEnteredOnce] = useState(false);

    const { ref, inView, entry } = useInView({
        threshold: 0.1,
        trackVisibility: true,
        delay: 100,
    });


    const resize = () => {
        const image = item.content.hero_video_poster.filename;
        if(image) {
            var imageService = 'https://img2.storyblok.com/'
            var path = image.replace('https://a.storyblok.com', '')
            return imageService + '10x' + path
        }
        else return '';
    }

    const thisVideo = useRef(null)

    const isImage = (source) => {
        return source.indexOf('.png') > -1 || source.indexOf('.jpg') > -1 || source.indexOf('.jpeg') > -1
    }

    useEffect(() => {
        // if(thisVideo.current) {
        //     if(inView) {
        //         thisVideo.current.play()
        //     }
        //     else thisVideo.current.pause()
        // }
        if(inView) setEnteredOnce(true)
        else if(thisVideo.current) thisVideo.current.pause()
    }, [inView])

    const playVideo = () => {
        if(thisVideo.current) thisVideo.current.play()
    }
    const pauseVideo = () => {
        if(thisVideo.current) thisVideo.current.pause()
    }

    return (
        <div className='project-item__media' ref={ref} style={{opacity: (!enteredOnce && !inView) ? 0:1}}
            onMouseOver={playVideo} onMouseOut={pauseVideo}
        >
            { isImage(item.content.hero_media.filename) ? (
                <Image data={item.content.hero_media} shown={inView}/>
            ):(
                <video muted poster={resize()} ref={thisVideo}>
                    <source src={item.content.hero_media.filename} />
                </video>
            )}
        </div>
    )
}