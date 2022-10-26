import React from 'react'
import { useInView } from 'react-intersection-observer';
import KeyWord from '../intro/KeyWord';

const Description = ({content}) => {
    
    const { ref, inView, entry } = useInView({
        threshold: 0.1,
        trackVisibility: true,
        delay: 100,
        triggerOnce: true
    });

    return (
       <div className='block__meta' ref={ref}>
        {inView && <KeyWord word={content} />}
       </div>
    )

}


export default Description



