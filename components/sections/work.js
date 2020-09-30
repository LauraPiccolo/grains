import Blocks from '../blocks/blocks'

const Work = ({ content, anchor }) => {
console.log.content;
    return (
        <section className={`work ${anchor}`}>
            <Blocks blocks={content} />
        </section>
    )
}
  
export default Work
