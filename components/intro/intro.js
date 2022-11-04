import { useEffect, useState } from "react";
import KeyWord from "./KeyWord"

const Intro = ({ text, lang }) => {
    
    const [start, setStart] = useState(false);

    useEffect(() => {
        setTimeout(() => setStart(true), 1000);
        setTimeout(() => {
            document.querySelector('.intro-wrapper').scrollTo({
                behavior: 'smooth',
                top: window.innerHeight,
                left: 0
            })
        }, 3000)
    }, [])

    const checkScroll = (event) => {
        if(event.target.scrollTop >= window.innerHeight) {
            event.target.style.display = "none";
            setTimeout(() => {
                document.querySelector('.popup').style.right = '0px';
            }, 3000);
        }
    }

    return (
        <div className="intro-wrapper vph" onScroll={(event) => checkScroll(event)}>
            <div className="intro vph">
                <h1>
                    {start && <KeyWord word={text} blockspeed={2} lang={lang}/>}
                </h1>
            </div>
            <div className="blur--1" />
        </div>
    )

}

export default Intro