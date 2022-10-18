import React from 'react'
import { render } from 'storyblok-rich-text-react-renderer';
import { useInView } from 'react-intersection-observer';

const Description = ({content}) => {
    
    const { ref, inView, entry } = useInView({
        /* Optional options */
        // threshold: createTreshold(),
        threshold: 0.1,
        trackVisibility: true,
        delay: 100
    });

    console.log(content)

    return (
       <div className='block__meta' ref={ref}>
        {render(content)}
       </div>
    )

}


export default Description



