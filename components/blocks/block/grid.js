
import Image from '../../utils/image'


const BlockGrid = ({ content }) => {

    return (
        <div className="block--grid" style={{
            gridTemplateColumns: `repeat(12, 1fr)`,
            gridTemplateRows: `repeat(${content.items.length}, auto)`
        }}>
            {
                content.items.map((row, index) => (
                    row.images.length === 1 ? (
                        <div className={`griditem griditem--${row.mode}`} key={`row--${index}`} style={{ gridRowStart:index+1, gridRowEnd:index+2}}>
                            <Image data={row.images[0]} mode={""}/>
                            {(row.images[0].title && row.images[0].title.length > 0) && (<p className="grid-item__description">{row.images[0].title}</p>)}
                        </div>
                    ):(
                        <div className={`gridrow griditem--${row.mode}`} key={`row--${index}`}>
                            <div className='griditem' style={{ gridRowStart:index+1, gridRowEnd:index+2}}>
                                <Image data={row.images[0]} mode={""}/>
                                {(row.images[0].title && row.images[0].title.length > 0) && (<p className="grid-item__description">{row.images[0].title}</p>)}
                            </div>
                            <div className='griditem' style={{ gridRowStart:index+1, gridRowEnd:index+2}}>
                                <Image data={row.images[1]} mode={""}/>
                                {(row.images[1].title && row.images[1].title.length > 0) && (<p className="grid-item__description">{row.images[1].title}</p>)}
                            </div>
                        </div>
                    )
                ))
                
            }
            
        </div>
    )
}

export default BlockGrid