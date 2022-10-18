import React from 'react'
import { render } from 'storyblok-rich-text-react-renderer';

const Description = ({content}) => {

    console.log(content)

    return (
       <div className='block__meta'>
        {render(content)}
       </div>
    )

}


export default Description



