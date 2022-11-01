import React from 'react'
import { useInView } from 'react-intersection-observer';
import KeyWord from '../intro/KeyWord';

const Description = ({content, lang}) => {
    
    const { ref, inView, entry } = useInView({
        threshold: 0.1,
        trackVisibility: true,
        delay: 100,
        triggerOnce: true
    });

    return (
       <div className='block__meta' ref={ref}>
        {inView && <KeyWord word={content} blockspeed={8} lang={lang}/>}
        <div className='block__meta__hidden'>{content}</div>
       </div>
    )

}


export default Description



