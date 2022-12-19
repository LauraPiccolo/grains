import React, { useEffect, useRef, useState } from 'react';
import Image from '../utils/image'

export default function SliderItem ({item, index, currentSlide}) {

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
        if(thisVideo.current) {
            if(currentSlide === index) thisVideo.current.play()
            else thisVideo.current.pause()
        }
    }, [currentSlide])


    return (
        <div>
            { isImage(item.content.hero_media.filename) ? (
                <Image data={item.content.hero_media} />
            ):(
                <video muted poster={resize()} ref={thisVideo}>
                    <source src={item.content.hero_media.filename} />
                </video>
            )}
        </div>
    )
}