import Link from 'next/link'
import BlockTextarea from './block/textarea'
import BlockGrid from './block/grid'

const Blocks = ({ blocks }) => {

    console.log(blocks)

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
                default:
                    return
              }
        }
        )}
        </div>
    )
}
  
export default Blocks
