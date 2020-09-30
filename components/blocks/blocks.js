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
                    return <BlockTextarea content={block} />
                    break
                case 'grid':
                    return <BlockGrid content={block} />
                    break
                case 'columns':
                    return <BlockColumns content={block} />
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
