import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Header from '../header/header';

const Information = ({lang, setLang}) => {

    const email = {
        en: 'Email',
        ja: '电子邮件'
    }

    const createTreshold = () => {
        const treshold = [];
        for(let i = 0; i <= 1; i += 0.1) {
            treshold.push(i)
        }
        return treshold;
    }
 
    const [ref, inView] = useInView({
        /* Optional options */
        // threshold: createTreshold(),
        threshold: 0.95,
        trackVisibility: true,
        delay: 100
    });

    const [ref1, inView1] = useInView({
        /* Optional options */
        // threshold: createTreshold(),
        threshold: 0,
        // trackVisibility: true,
        // delay: 100
    });

    const [ref2, inView2] = useInView({
        /* Optional options */
        // threshold: createTreshold(),
        threshold: 0.99,
        // trackVisibility: true,
        // delay: 100
    });


    const [ref3, inView3] = useInView({
        /* Optional options */
        // threshold: createTreshold(),
        threshold: 0,
        // trackVisibility: true,
        // delay: 100
    });


    useEffect(() => {
        if(inView3) {
            window.scrollTo(0,0);
        }
        console.log(inView3)
    }, [inView3])

    // useEffect(() => {
    //     if(inView1) {
    //         window.scrollTo(100000,0);
    //     }
    // }, [inView1])

    const blurMain = (el) => {
        console.log(el.scrollTop);
        if(el.scrollTop < window.innerHeight) {
            document.querySelector('.projects').style.filter = `blur(${el.scrollTop / window.innerHeight * 30}px)`;
        }
        if(el.scrollTop > window.innerHeight) {
            document.querySelector('.projects').style.filter = `blur(${30 - (el.scrollTop / (window.innerHeight*2) * 30)}px)`;
        }
    }

    return (
        <div className="information--modal" ref={ref} 
        style={{pointerEvents: inView ? 'all':'none', 
            position: ((inView2 || inView3) && inView) ? 'fixed':'absolute',
            marginTop: ((inView2 || inView3) && inView) ? '0':'-100vh',
            top: (inView2 || inView3) ? '0':'unset'
        }}
        onScroll={(event) => blurMain(event.target)}
        >
            <div className='blur--1' ref={ref1} />
            <div className='information' ref={ref2}>
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
        </div>
    )
}


export default Information