import Blocks from '../blocks/blocks'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

const Work = ({ content, anchor }) => {

    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0,
    });

    // Function to call after current section className has been found
    const changeActiveSection = (sectionClass) => {
        document.querySelector('.nav__section.active').className = 'nav__section'
        document.querySelector(`a[data-href='.${sectionClass}']`).className = "nav__section active"
    }

    useEffect(() => {
        if(inView) changeActiveSection(anchor)
    },[inView])

    return (
        <section className={`work ${anchor}`} ref={ref}>
            <Blocks blocks={content} />
        </section>
    )
}
  
export default Work
