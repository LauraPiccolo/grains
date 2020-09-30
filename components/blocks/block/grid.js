
import Image from '../../utils/image'


const SectionGrid = ({ content }) => {

    console.log(content.items);

    return (
        <div className="section--grid" style={{
            gridTemplateColumns: `repeat(12, 1fr)`,
            gridTemplateRows: `repeat(${content.items.length}, auto)`
        }}>
            {
                content.items.map((raw, index) => (
                    raw.images.length === 1 ? (
                        <Image data={raw.images[0]} mode={""} class={raw.mode} style={{
                            gridRowStart:index+1, gridRowEnd:index+2
                        }}/>
                    ):(
                        <>
                        <Image data={raw.images[0]} mode={""} class={raw.mode} style={{
                            gridRowStart:index+1, gridRowEnd:index+2
                        }}/>
                        <Image data={raw.images[1]} mode={""} class={raw.mode} style={{
                            gridRowStart:index+1, gridRowEnd:index+2
                        }}/>
                        </>
                    )
                ))
                
            }
            
        </div>
    )
}

export default SectionGrid