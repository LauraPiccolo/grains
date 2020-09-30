import Blocks from '../blocks/blocks'

const Work = ({ content }) => {
console.log.content;
    return (
        <section className={`work`}>
            <Blocks blocks={content} />
        </section>
    )
}
  
export default Work
