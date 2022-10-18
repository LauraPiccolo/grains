import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Header from '../header/header';
import { useLocomotiveScroll } from 'react-locomotive-scroll'
import { render } from 'storyblok-rich-text-react-renderer';

const Information = ({lang, setLang, scrollLocked, setScrollLocked, content}) => {
    
    const [reftop, inView1] = useInView({threshold: 0.9});
    const [reflast, inView2] = useInView({threshold: 0.99});

    useEffect(() => {
       if(inView2) {
            setScrollLocked(false);
            setTimeout(() => document.querySelector('.information--modal').scrollTo(0,0), 1000);
        }
    }, [inView2])

    useEffect(() => {
        if(inView1) {
            document.querySelector('#scroll-wrapper').scrollTo(0,0);
        }
    }, [inView1])


    // const scrollUp = () => { 
    //     console.log('SCROLL UP')
    //     scroll && scroll.scrollTo('top', { smooth: false, lerp: 0, duration: 1 }) 
    // }

    const email = {
        en: 'Email',
        ja: '电子邮件'
    }

    const blur = (event) => {
        console.log(event.target.scrollTop)
        if(event.target.scrollTop < 1) {
            console.log('UNLOCK')
            setScrollLocked(false)
            document.querySelector('#scroll-wrapper').style.filter = 'blur(0px)';
            document.querySelector('.header').style.filter = 'blur(0px)';
        }
        else if(event.target.scrollTop > 10 && event.target.scrollTop < window.innerHeight ) {
            document.querySelector('#scroll-wrapper').style.filter = `blur(${(event.target.scrollTop / window.innerHeight)*30}px)`
            document.querySelector('.header').style.filter = `blur(${(event.target.scrollTop / window.innerHeight)*30}px)`
        }
        else if(event.target.scrollTop > window.innerHeight ) {
            document.querySelector('#scroll-wrapper').style.filter = `blur(${30 - ((event.target.scrollTop - window.innerHeight) / window.innerHeight)*30}px)`
            document.querySelector('.header').style.filter = `blur(${30 - ((event.target.scrollTop - window.innerHeight) / window.innerHeight)*30}px)`
        }
    }

    return (
        <footer className="information--modal vph" 
        // onClick={scrollUp} 
        onScroll={(event) => blur(event)}
        style={{zIndex: scrollLocked ? 10:-1}}
        // data-scroll-speed="20" data-scroll 
        >
            <div className='blur--1 vph'/>
            <div className='information vph' 
            ref={reftop}
            // data-scroll data-scroll-speed="0.05"
            >
                <Header lang={lang} setLang={setLang} fixed={false}/>
                <div className="information__text">
                    {render(content[`description_${lang}`])}
                </div>
                <footer>
                    <nav className="information__social">
                        <ul>
                            <li><a href={`mailto:${content.email.url}`} target="_blank">{email[lang]}</a></li>
                            <li><a href={content.instagram.url} target="_blank">Instagram</a></li>
                            <li><a href={content.arena.url} target="_blank">Are.na</a></li>
                        </ul>
                    </nav>
                </footer>
            </div>
            <div className='blur--2 vph'
            // data-scroll-offset="100%"
            data-scroll
            ref={reflast}/>
        </footer>
    )
}


export default Information