import Header from '../header/header';
import { render } from 'storyblok-rich-text-react-renderer';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Information = ({lang, setLang, content}) => {

    // const { ref, inView, entry } = useInView({
    //     threshold: 0.99,
    //     trackVisibility: true,
    //     delay: 100
    // });

    // useEffect(() => {
    //     if(inView) lock()
    // }, [inView])

    const email = {
        en: 'Email',
        ja: '电子邮件'
    }

    // const lock = () => {
    //     console.log('LOCK')
    //     // document.querySelector('.wrapper--1').style.overflowY = 'hidden';
    //     // setTimeout(() => {
    //     //     document.querySelector('.wrapper--1').style.overflowY = 'scroll';
    //     // }, 1000)
    // }

    return (
        <footer className="information--modal vph">
            <div className='information vph'>
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
            <div className='blur--2 vph'/>
        </footer>
    )
}


export default Information