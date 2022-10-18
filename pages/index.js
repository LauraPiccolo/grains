import { getHome, getAbout } from '../lib/api'
import Wrapper from '../components/main/wrapper'
import { useState, useEffect } from 'react'
import Header from '../components/header/header'
import Information from '../components/information/information'
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import { useRef } from 'react'
import smoothscroll from 'smoothscroll-polyfill';
import Intro from '../components/intro/intro'
import Popup from '../components/popup/popup'


const Home = ({ content, about }) => {
    console.log(content)
    // const { scroll } = useLocomotiveScroll();

    const [lang, setLang] = useState('en')
    const [scrollLocked, setScrollLocked] = useState(false);
    console.log(about)

    useEffect(() => {
        smoothscroll.polyfill();
        setTimeout(() => {
            let vphList = document.querySelectorAll('.vph');
            for(let i = 0; i < vphList.length; i++) {
                vphList[i].style.height = `${window.innerHeight}px`;
            }
            // document.querySelector('.information--modal').style.marginTop = `-${window.innerHeight}px`;
        }, 1000)
    }, [])

    return (

        <div className='container'>
            <Header lang={lang} setLang={setLang} fixed={true}/>
            <Intro />
            {about.title && about.text && <Popup title={about.title} text={about.text} />}
            <Information lang={lang} scrollLocked={scrollLocked} setScrollLocked={setScrollLocked} content={about} setLang={setLang}/>
            <Wrapper blocks={content.blocks} lang={lang} scrollLocked={scrollLocked} setScrollLocked={setScrollLocked}/>
        </div>

    )
}

export default Home

export async function getStaticProps({ preview = null }) {
    const content = (await getHome(preview)) || []
    const about = (await getAbout(preview)) || []
    return {
        props: { content, about }
    }
}

