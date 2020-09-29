import Link from 'next/link'
import SectionTextarea from './section/textarea'
import SectionGrid from './section/grid'

const Sections = ({ content }) => {

    const sections = content.sections
    console.log(sections)

    return (
        <div>
        {sections.map((section) => {
            switch(section.component) {
                case 'textarea':
                    return <SectionTextarea content={section} />
                    break
                case 'grid':
                    return <SectionGrid content={section} />
                    break
                default:
                    return
              }
        }
        )}
        </div>
    )
}
  
export default Sections
