import dynamic from 'next/dynamic'

const DynamicPlayer = dynamic(() => import('./listenVisual'), {
    ssr: false
  })

export default function ListenVisualWrapper({}) {

  return (
    <div className='visual-wrapper'>
       <DynamicPlayer/>
    </div>
  )
}