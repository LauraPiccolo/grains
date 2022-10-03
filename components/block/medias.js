import React from 'react'
import Media from './media'

const MediaWrapper = ({block}) => {

    return (
        <>
        <div className={`block__media block__media--1`}>
                <Media 
                    src={
                        (block.component === "full_block" || block.component === "third_block") ? block.media.filename
                        :
                        block.component === "mobile_block" ? block.media_1.filename
                        :
                        block.media_left.filename
                    }
                    poster={
                        (block.component === "full_block" || block.component === "third_block") ? block.poster.filename
                        :
                        block.component === "mobile_block" ? block.poster_1.filename
                        :
                        block.poster_left.filename
                    }
                />
            </div>
            {
                !(block.component === "full_block" || block.component === "third_block") &&
                <div className={`block__media block__media--2`}>
                    <Media 
                        src={
                            block.component === "mobile_block" ? block.media_2.filename
                            :
                            block.media_right.filename
                        }
                        poster={
                            block.component === "mobile_block" ? block.poster_2.filename
                            :
                            block.poster_right.filename
                        }
                    />
                </div>
            }
            {
                (block.component === "mobile_block" && block.media_3.filename !== "") &&
                <div className={`block__media block__media--3`}>
                    <Media 
                        src={block.media_3.filename}
                        poster={ block.poster_3.filename}
                    />
                </div>
            }
            {
                (block.component === "mobile_block" && block.media_4.filename !== "" && block.media_3.filename !== "") &&
                <div className={`block__media block__media--4`}>
                    <Media 
                        src={block.media_4.filename}
                        poster={ block.poster_4.filename}
                    />
                </div>
            }
        </>
    )
}


export default MediaWrapper
