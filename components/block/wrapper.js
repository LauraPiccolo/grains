import React from 'react'
import Block from './index'

const Wrapper = ({blocks, lang}) => {

    console.log(blocks);

    return (
       <main className='projects'>
           {
            blocks.map((block) => (
                <Block block={block} lang={lang}/>
            ))
           } 
       </main>
    )

}


export default Wrapper



