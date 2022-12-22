import React, { useEffect, useState } from 'react';
import HeaderNav from './headerNav';

let previousScroll = 0;

export default function HeaderWrapper ({location, content, inverted}) {

    const [headerHidden, setHeaderHidden] = useState(false);

    useEffect(() => {
        previousScroll = 0;
    }, [location])

    useEffect(() => {
        window.addEventListener('scroll', detectScrollDir)
        return () => window.removeEventListener('scroll', detectScrollDir)
    }, [])

    const detectScrollDir = () => {
        if(window.scrollY < previousScroll) setHeaderHidden(false)
        if(window.scrollY > previousScroll) setHeaderHidden(true)
        previousScroll = window.scrollY
    }

    useEffect(() => {
        if(headerHidden) console.log('HIDING HEADER')
        else console.log('SHOWING HEADER');
    }, [headerHidden])

    return (
        <header className={`header${inverted ? ' header--inverted':''}`} onMouseEnter={() => setHeaderHidden(false)}>
            <div className='header__slider' style={{marginTop: headerHidden ? '-100px':'0px'}}>
                <HeaderNav navLinks={content.content.nav_links_left} location={location}/>
                <h1>INTERLUDE</h1>
                <HeaderNav navLinks={content.content.nav_links_right} location={location}/>
            </div>
        </header>
    )
}