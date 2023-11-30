import dynamic from 'next/dynamic'

const DynamicPlayer = dynamic(() => import('./listenVisual'), {
    ssr: false
  })

export default function ListenVisualWrapper({live}) {

  return (
    <div className='visual-wrapper'>
       <DynamicPlayer live={live}/>
    </div>
  )
}