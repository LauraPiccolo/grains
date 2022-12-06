import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function SliderFooter ({content, currentSlide, totalLength, transitioning}) {

    const [opacity, setOpacity] = useState(0);

    console.log(content.content.category);

    useEffect(() => {
        setOpacity(transitioning ? 0 : 1);
    }, [transitioning])

    return (
        <footer className='slider__footer' style={{opacity: opacity}}>
            <div className='footer__first'>
                <h2>{content.content.title}</h2>
                <span>{currentSlide + 1}/{totalLength}</span>
            </div>
            <div className='footer__second'>
                <Link href={content.content.category.slug}>
                    <p>
                        {content.content.category.slug.replace(/-/g, ' ')}
                    </p>
                </Link>
                <Link href={`projects/${content.slug}`}>
                    <p>
                        View Project
                    </p>
                </Link>
            </div>
        </footer>
    )
}