import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Header from '../header/header';
import { useLocomotiveScroll } from 'react-locomotive-scroll'

const Information = ({lang, setLang}) => {

    const { scroll } = useLocomotiveScroll()
    const [ref, inView] = useInView({threshold: 0.99});

    useEffect(() => {
        if(inView) {
            console.log('SCROLL UP')
            scrollUp();
        }
    }, [inView])


    const scrollUp = () => { 
        console.log('SCROLL UP')
        scroll && scroll.scrollTo('top', { smooth: false, lerp: 0, duration: 1 }) 
    }

    const email = {
        en: 'Email',
        ja: '电子邮件'
    }

    return (
        <footer className="information--modal" 
        onClick={scrollUp} 
        // data-scroll-speed="20" data-scroll 
        >
            <div className='blur--1'/>
            <div className='information' 
            // data-scroll data-scroll-speed="0.05"
            >
                <Header lang={lang} setLang={setLang} />
                <div className="information__text">
                    Visual ASSOCIATES is a creative agency founded by fraser clark. we partner with modern brands & individuals, CREATING campaigns, identities and digital experiences that shift perceptions, build influence and impact culture.
                </div>
                <footer>
                    <nav className="information__social">
                        <ul>
                            <li><a href="x" target="_blank">{email[lang]}</a></li>
                            <li><a href="x" target="_blank">Instagram</a></li>
                            <li><a href="x" target="_blank">Are.na</a></li>
                        </ul>
                    </nav>
                </footer>
            </div>
            <div className='blur--2'
            // data-scroll-offset="100%"
            data-scroll
            ref={ref}/>
        </footer>
    )
}


export default Information