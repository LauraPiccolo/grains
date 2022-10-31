import { getHome, getAbout } from '../lib/api'
import Wrapper from '../components/main/wrapper'
import { useState, useEffect } from 'react'
import Header from '../components/header/header'
import Information from '../components/information/information'
import smoothscroll from 'smoothscroll-polyfill';
import Intro from '../components/intro/intro'
import Popup from '../components/popup/popup'
import Head from '../components/head'


const Home = ({ content, about }) => {

    const [lang, setLang] = useState('en')
    const [scrollBack, setScrollBack] = useState(false)
    const [infoBlock, setInfoBlock] = useState(false)

    useEffect(() => {
        smoothscroll.polyfill();
        setTimeout(() => {
           handleResize()
        }, 1000)
        window.addEventListener('resize', () => handleResize())

        return window.removeEventListener('resize', () => handleResize())
    }, [])

    const handleResize = () => {
        console.log('handle resize')
        let vphList = document.querySelectorAll('.vph');
        for(let i = 0; i < vphList.length; i++) {
            vphList[i].style.height = `${window.innerHeight}px`;
        }
        document.querySelector('.wrapper--1').scrollTo(0, document.querySelector('.wrapper--2').scrollTop);
        document.querySelector('.wrapper--1').style.backdropFilter = `blur(0px)`;
    }

    const syncScroll = (click) => {
        if(click) {
            setInfoBlock(true);
            if(document.querySelector('.wrapper--1').scrollTop < document.querySelector('.wrapper--2').scrollHeight) {
                document.querySelector('.wrapper--1').scrollTo({
                    left: 0, 
                    top: document.querySelector('.wrapper--1 .information--modal').offsetTop - window.innerHeight,
                });
            }
            setTimeout(() => {
                document.querySelector('.wrapper--1').scrollTo({
                left: 0, 
                top: document.querySelector('.wrapper--1 .information--modal').offsetTop,
                behavior: 'smooth'
                });
                setScrollBack(true);
            }, 100);
        }
        else {
            if(!scrollBack) {
                if(!infoBlock) document.querySelector('.wrapper--2').scrollTo(0, document.querySelector('.wrapper--1').scrollTop);
        
                // If scrolled to top of footer, blur
                if(document.querySelector('.wrapper--1').scrollTop > (document.querySelector('.wrapper--2 #scroll-wrapper').clientHeight - window.innerHeight + 10)) {
                    const blurValue = (document.querySelector('.wrapper--1').scrollTop - (document.querySelector('.wrapper--2 #scroll-wrapper').clientHeight) + window.innerHeight) / window.innerHeight * 20 - 5;
                    document.querySelector('.wrapper--1').style.backdropFilter = `blur(${blurValue}px)`;
                    document.querySelector('.header--fixed').style.zIndex = 2;
                    document.querySelector('.information--modal').style.position = 'sticky'
                    // document.querySelector('.information--modal').style.scrollSnapAlign = 'start';
                }
    
                // // If scrolled to bottom of footer, scroll up
                // console.log(document.querySelector('.wrapper--1').scrollTop, document.querySelector('.wrapper--2 #scroll-wrapper').clientHeight + 60)
                // if(!scrollBack && document.querySelector('.wrapper--1').scrollTop === document.querySelector('.wrapper--2 #scroll-wrapper').clientHeight + 60) {
                //     document.querySelector('.wrapper--1').style.overflowY = 'hidden';
                //     setTimeout(() => { 
                //         document.querySelector('.information--modal').style.height = `${2*window.innerHeight}px` 
                //         document.querySelector('.wrapper--1').style.overflowY = 'scroll';
                //     }, 1000);
                // }
    
                // If scrolled to bottom of footer, scroll up
                if(!scrollBack && document.querySelector('.wrapper--1').scrollTop > document.querySelector('.wrapper--2 #scroll-wrapper').clientHeight + 112) {
                    document.querySelector('.wrapper--2').scrollTo(0,0);
                    setTimeout(() => {
                        document.querySelector('.information--modal').style.position = 'relative';
                    }, 1000)
                    setScrollBack(true);
                }

                // If scrolled completely up, remove blur & show header on top
                if(document.querySelector('.wrapper--1').scrollTop < (document.querySelector('.wrapper--2 #scroll-wrapper').clientHeight - window.innerHeight - 10)) {
                    document.querySelector('.wrapper--1').style.backdropFilter = `blur(0px)`;
                    document.querySelector('.header--fixed').style.zIndex = 10;
                    setInfoBlock(false);
                    if(infoBlock) document.querySelector('.wrapper--1').scrollTo(0, document.querySelector('.wrapper--2').scrollTop);
                }
            }
            else {
                // If scrolling back up, unlock scroll
                if(document.querySelector('.wrapper--1').scrollTop < document.querySelector('.wrapper--2 #scroll-wrapper').clientHeight + 112) {
                    if(!infoBlock) document.querySelector('.wrapper--2').scrollTo(0, document.querySelector('.wrapper--1').scrollTop);
                    document.querySelector('.wrapper--1').style.backdropFilter = `blur(0px)`;
                    // document.querySelector('.wrapper--1').style.scrollSnapAlign = 'y proximity';
                    setScrollBack(false);
                }

                else {
                    // Unblur
                    const blurValue = window.innerHeight / (document.querySelector('.wrapper--1').scrollTop - (document.querySelector('.wrapper--2 #scroll-wrapper').clientHeight) + window.innerHeight) * 20 - 10;
                    document.querySelector('.wrapper--1').style.backdropFilter = `blur(${blurValue}px)`;
                    // if(blurValue >= 10) document.querySelector('.wrapper--1').style.scrollSnapAlign = 'y mandatory';
                    // if(blurValue < 10) {
                    //     // document.querySelector('.information--modal').style.scrollSnapAlign = 'unset';
                    //     // if(blurValue >= 10) document.querySelector('.wrapper--1').style.scrollSnapAlign = 'y proximity';
                    // }
                }
    
                // Restart website
                if(document.querySelector('.wrapper--1').scrollTop >= document.querySelector('.wrapper--1').scrollHeight - window.innerHeight) {
                    if(infoBlock) document.querySelector('.wrapper--1').scrollTo(0, document.querySelector('.wrapper--2').scrollTop);
                    else document.querySelector('.wrapper--1').scrollTo(0,0);
                    setTimeout(() => { document.querySelector('.information--modal').style.height = `${2*window.innerHeight}px` }, 500);
                    document.querySelector('.header--fixed').style.zIndex = 10;
                    setScrollBack(false)
                    setTimeout(() => setInfoBlock(false), 10);
                }
            }
        }
    }

    return (

        <>
        <Head />
        <div className='container'>
            <Header lang={lang} setLang={setLang} fixed={true} syncScroll={syncScroll}/>
            <Intro text={about.intro}/>
            {about.title && about.text && <Popup title={about.title} text={about.text} />}
            <div className='wrapper wrapper--1 vph' onScroll={(event) => syncScroll(false)}>
                <Wrapper blocks={content.blocks} lang={lang}/>
                <Information lang={lang} content={about} setLang={setLang}/>
            </div>
            <div className='wrapper wrapper--2 vph'>
                <Wrapper blocks={content.blocks} lang={lang} />
            </div>
            
        </div>
        </>

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

