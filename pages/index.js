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
        window.addEventListener('resize', handleResize)

        return window.removeEventListener('resize', handleResize)
    }, [])

    const handleResize = () => {
        let vphList = document.querySelectorAll('.vph');
        for(let i = 0; i < vphList.length; i++) {
            vphList[i].style.height = `${window.innerHeight}px`;
        }
        document.querySelector('.wrapper--1').scrollTo(0, document.querySelector('.wrapper--2').scrollTop);
        document.querySelector('.wrapper--1').style.backdropFilter = `blur(0px)`;
    }

    const syncScroll = (click) => {
        if(click) {
            setScrollBack(true);
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
            }, 100);
        }
        else {
            if(!scrollBack && !infoBlock) {
                document.querySelector('.wrapper--2').scrollTo(0, document.querySelector('.wrapper--1').scrollTop);
        
                // If scrolled to top of footer, blur
                if(document.querySelector('.wrapper--1').scrollTop > (document.querySelector('.wrapper--2 #scroll-wrapper').clientHeight - window.innerHeight + 10)) {
                    const blurValue = (document.querySelector('.wrapper--1').scrollTop - (document.querySelector('.wrapper--2 #scroll-wrapper').clientHeight) + window.innerHeight) / window.innerHeight * 20 - 5;
                    document.querySelector('.wrapper--1').style.backdropFilter = `blur(${blurValue}px)`;
                    document.querySelector('.header--fixed').style.zIndex = 2;
                    document.querySelector('.information--modal').style.scrollSnapAlign = 'start';
                }
    
                // If scrolled to bottom of footer, scroll up
                if(document.querySelector('.wrapper--1').scrollTop > document.querySelector('.wrapper--2 #scroll-wrapper').clientHeight + 112) {
                    document.querySelector('.wrapper--2').scrollTo(0,0);
                    setScrollBack(true);
                }

                if(document.querySelector('.wrapper--1').scrollTop < (document.querySelector('.wrapper--2 #scroll-wrapper').clientHeight - window.innerHeight - 10)) {
                    document.querySelector('.wrapper--1').style.backdropFilter = `blur(0px)`;
                    document.querySelector('.header--fixed').style.zIndex = 10;
                }
            }
            else {
                // If scrolling back up, unlock scroll
                if(document.querySelector('.wrapper--1').scrollTop < document.querySelector('.wrapper--2 #scroll-wrapper').clientHeight + 112 && !infoBlock) {
                    document.querySelector('.wrapper--2').scrollTo(0, document.querySelector('.wrapper--1').scrollTop);
                    document.querySelector('.wrapper--1').style.backdropFilter = `blur(0px)`;
                    setScrollBack(false);
                }

                else {
                    // Unblur
                    const blurValue = window.innerHeight / (document.querySelector('.wrapper--1').scrollTop - (document.querySelector('.wrapper--2 #scroll-wrapper').clientHeight) + window.innerHeight) * 20 - 10;
                    document.querySelector('.wrapper--1').style.backdropFilter = `blur(${blurValue}px)`;
                    document.querySelector('.information--modal').style.scrollSnapAlign = 'unset';
                }
    
                // Restart website
                if(document.querySelector('.wrapper--1').scrollTop >= document.querySelector('.wrapper--1').scrollHeight - window.innerHeight) {
                    if(infoBlock) document.querySelector('.wrapper--1').scrollTo(0, document.querySelector('.wrapper--2').scrollTop);
                    else document.querySelector('.wrapper--1').scrollTo(0,0);

                    document.querySelector('.header--fixed').style.zIndex = 10;
                    setScrollBack(false)
                    setTimeout(() => setInfoBlock(false), 10);
                }

                // If scrolled to top of footer, blur
                if(infoBlock && document.querySelector('.wrapper--1').scrollTop > (document.querySelector('.wrapper--2 #scroll-wrapper').clientHeight - window.innerHeight + 10)) {
                    const blurValue = (document.querySelector('.wrapper--1').scrollTop - (document.querySelector('.wrapper--2 #scroll-wrapper').clientHeight) + window.innerHeight) / window.innerHeight * 20 - 5;
                    document.querySelector('.wrapper--1').style.backdropFilter = `blur(${blurValue}px)`;
                    document.querySelector('.header--fixed').style.zIndex = 2;
                    document.querySelector('.information--modal').style.scrollSnapAlign = 'start';
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

