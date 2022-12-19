import React, { useEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Cursor from '../cursor/cursor';
import SliderFooter from './sliderFooter';
import SliderItem from './sliderItem';

export default function Slider ({content, projectList}) {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [transitioning, setTransitioning] = useState(false)
    const thisPrev = useRef(null);
    const thisNext = useRef(null);

    const handleChange = (index) => {
        setTransitioning(true)
        setTimeout(() => {
            setCurrentSlide(index)
            setTransitioning(false) 
        }, 1000);
    }

    return (
        <>
        <Carousel 
        autoPlay
        interval={4000}
        onChange={handleChange}
        showArrows={false}
        showIndicators={false}
        showStatus={false}
        transitionTime={1000}
        infiniteLoop={true}
        renderArrowPrev={(clickHandler, hasPrev, labelPrev) => (
            <div className='slider__prev' onClick={clickHandler} ref={thisPrev}>
                <Cursor parent={thisPrev} text="previous"/>
            </div>
        )}
        renderArrowNext={(clickHandler, hasNext, labelNext) => (
            <div className='slider__next' onClick={clickHandler} ref={thisNext}>
                <Cursor parent={thisNext} text="next"/>
            </div>
        )}
        showThumbs={false}
        >
            {
                content.project_list.map((item, index) => (
                    <SliderItem item={item} projectList={projectList} key={`sliderItem--${index}`}
                    index={index} currentSlide={currentSlide}
                    />
                ), [])
            }
        </Carousel>
        <SliderFooter content={projectList[currentSlide]} currentSlide={currentSlide} totalLength={content.project_list.length} transitioning={transitioning}/>
        </>
    )
}