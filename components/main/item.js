import React from 'react'
import Description from './description'
import MediaWrapper from './medias'

const Block = ({block, lang, index}) => {

    return (
       <article className='project'>
            <div className={
                `block 
                block--${block.component}
                ${block.component === "mobile_block" && block.media_3.filename ? "block--mobile--4":""}
                ${block.align ? ` block--aligned--${block.align[0]}`:''}
                ${block.double_gutters ? ` block--double-gutters`:''}
                `
            }>
                <MediaWrapper block={block} />
            </div>
            <Description content={block[`description_${lang}`]} lang={lang} />
       </article>
    )

}


export default Block



