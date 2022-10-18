import React from 'react'
import Description from './description'
import MediaWrapper from './medias'

const Block = ({block, lang, last, first, index}) => {

    // block = {
    //     component: 'full_block',
    //     media: {
    //         filename: ''
    //     },
    //     poster: {
    //         filename: ''
    //     }
    // }

    return (
       <article className='project' data-scroll data-scroll-sticky={last || first} data-scroll-target={last ? '.information--modal':'.information--modal'} style={{backgroundColor: first?'blue':''}}>
            <div className={
                `block 
                block--${block.component}
                ${block.component === "mobile_block" && block.media_3.filename ? "block--mobile--4":""}
                ${block.align ? ` block--aligned--${block.align[0]}`:''}
                ${block.double_gutters ? ` block--double-gutters`:''}
                `
            }>
                <h1>{index}</h1>
                <MediaWrapper block={block} />
            </div>
            <Description content={block[`description_${lang}`]} />
       </article>
    )

}


export default Block



