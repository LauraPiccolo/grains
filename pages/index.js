import { getHome } from '../lib/api'
import Wrapper from '../components/main/wrapper'
import { useState } from 'react'
import Header from '../components/header/header'
import Information from '../components/information/information'
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import { useRef } from 'react'

const Home = ({ content }) => {
    console.log(content)
    const { scroll } = useLocomotiveScroll();

    const [lang, setLang] = useState('en')
    const containerRef = useRef(null)

    return (

        <div className='container'>
            <Header lang={lang} setLang={setLang} />
            <Wrapper blocks={content.blocks} lang={lang}/>
            {/* <Information lang={lang} /> */}
        </div>

    )
}

export default Home

export async function getStaticProps({ preview = null }) {
    const content = (await getHome(preview)) || []
    return {
        props: { content }
        // props: { content: {
        //     blocks: [
        //         'a','b','c','d','e' 
        //     ]
        // } }
    }
}

