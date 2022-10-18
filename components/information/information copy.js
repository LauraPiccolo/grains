import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Header from '../header/header';
import { useLocomotiveScroll } from 'react-locomotive-scroll'

const Information = ({lang, setLang}) => {

    const [scrollReset, setScrollReset] = useState(false);

    const email = {
        en: 'Email',
        ja: '电子邮件'
    }

    const { scroll } = useLocomotiveScroll()

 
    const [ref, inView] = useInView({threshold: 0.99});

    const [ref1, inView1] = useInView({threshold: 0});

    const [ref2, inView2] = useInView({threshold: 0.98});

    const [ref3, inView3] = useInView({threshold: 0.99});

    const [ref4, inView4] = useInView({threshold: 0});

    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log(scroll)
    //         // scroll.scrollTo("bottom")
    //     }, 10000)
    // }, [lang])


    // useEffect(() => {
    //     console.log(inView, inView1)
    //     if(inView && !inView1) {
    //         console.log('SHOULD SCROLL');
            
    //         setScrollReset(true)
    //     }
    //     // if(inView && inView1 && scrollReset) {
    //     //     window.scrollTo(100000,0);
    //     //     setScrollReset(false)
    //     // }
    // }, [inView, inView1])

    useEffect(() => {
        if(inView3) {
            // setScrollReset(false);
            console.log('SCROLL BACK TO TOP')
            console.log(scroll)
            // console.log('.project')
            // window.scrollTo(0,0);
            scroll.scrollTo("top")
            // scroll.scrollTo( 'top', {
            //     'offset': 0,
            //     'callback': function() {
            //         // do something...
            //     },
            //     'duration': 600,
            //     'easing': [0.25, 0.00, 0.35, 1.00],
            //     'disableLerp': true
            // } );
            // scroll.update();
        }
    }, [inView3])

    // useEffect(() => {
    //     if(inView1) {
    //         window.scrollTo(100000,0);
    //     }
    // }, [inView1])

    const blurMain = (el) => {
        console.log(`In View: `+inView);
        console.log(`In View1: `+inView1);
        console.log(`In View2: `+inView2);
        console.log(`In View3: `+inView3);
        if(el.scrollTop < window.innerHeight) {
            document.querySelector('.wrapper').style.filter = `blur(${el.scrollTop / window.innerHeight * 30}px)`;
        }
        if(el.scrollTop > window.innerHeight) {
            document.querySelector('.wrapper').style.filter = `blur(${30 - (el.scrollTop / (window.innerHeight*2) * 30)}px)`;
        }
    }

    return (
        <footer className="information--modal" ref={ref} 
        style={{
            pointerEvents: !inView ? 'none': (inView2 || inView4) ? 'all':'none',
            position: (inView && !inView1) ? 'fixed':'absolute',
            marginTop: (inView && !inView1) ? '0':'-100vh',
            top: (inView && !inView1) ? '0':'unset'
        }}
        onScroll={(event) => blurMain(event.target)}
        >
            <div className='blur--1' ref={ref1}>
                <div className='blur__child' ref={ref2}/>
            </div>
            <div className='information' ref={ref4}>
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
            <div className='blur--2' ref={ref3}/>
        </footer>
    )
}


export default Information