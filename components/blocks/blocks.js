import Link from 'next/link'
import BlockTextarea from './block/textarea'
import BlockGrid from './block/grid'
import BlockColumns from './block/columns'

const Blocks = ({ blocks }) => {

    return (
        <div>
        {blocks.map((block) => {
            switch(block.component) {
                case 'textarea':
                    return <BlockTextarea content={block} key={block._uid} />
                    break
                case 'grid':
                    return <BlockGrid content={block} key={block._uid} />
                    break
                case 'columns':
                    return <BlockColumns content={block} key={block._uid} />
                    break
                default:
                    return
              }
        }
        )}
        </div>
    )
}
  
export default Blocks
