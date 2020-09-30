
import Image from '../../utils/image'


const SectionGrid = ({ content }) => {

    console.log(content.items[0])

    return (
        <div className="section--grid">
            <Image data={content.items[0].images[0]} mode={""} />
        </div>
    )
}

export default SectionGrid