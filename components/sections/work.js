import Blocks from '../blocks/blocks'

const Work = ({ content }) => {

    return (
        <section className="work">
            <Blocks blocks={content} />
        </section>
    )
}
  
export default Work
