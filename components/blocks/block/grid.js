
import Image from '../../utils/image'


const BlockGrid = ({ content }) => {

    console.log(content.items);

    return (
        <div className="block--grid" style={{
            gridTemplateColumns: `repeat(12, 1fr)`,
            gridTemplateRows: `repeat(${content.items.length}, auto)`
        }}>
            {
                content.items.map((row, index) => (
                    row.images.length === 1 ? (
                        <div className={`griditem griditem--${row.mode}`} style={{ gridRowStart:index+1, gridRowEnd:index+2}}>
                            <Image data={row.images[0]} mode={"cover"}/>
                            <p className="grid-item__description">{row.images[0].caption}</p>
                        </div>
                    ):(
                        <div className={`gridrow griditem--${row.mode}`}>
                            <div className='griditem' style={{ gridRowStart:index+1, gridRowEnd:index+2}}>
                                <Image data={row.images[0]} mode={"cover"}/>
                                <p className="grid-item__description">{row.images[0].caption}</p>
                            </div>
                            <div className='griditem' style={{ gridRowStart:index+1, gridRowEnd:index+2}}>
                                <Image data={row.images[1]} mode={"cover"}/>
                                <p className="grid-item__description">{row.images[1].caption}</p>
                            </div>
                        </div>
                    )
                ))
                
            }
            
        </div>
    )
}

export default BlockGrid