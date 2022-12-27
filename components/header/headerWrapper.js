import React, { useEffect, useState } from 'react';
import HeaderNav from './headerNav';

let previousScroll = 0;

export default function HeaderWrapper ({location, content, inverted}) {

    const [headerHidden, setHeaderHidden] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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
        if(headerHidden) setMenuOpen(false)
    }, [headerHidden])

    return (
        <header className={`header${inverted ? ' header--inverted':''}`} onMouseEnter={() => setHeaderHidden(false)}>
            <div className='header__slider' style={{marginTop: headerHidden ? '-100px':'0px'}}>
                <HeaderNav navLinks={content.content.nav_links_left} location={location}/>
                <h1>INTERLUDE</h1>
                <HeaderNav navLinks={content.content.nav_links_right} location={location}/>
                <button className='header__burger' onClick={() => setMenuOpen(!menuOpen)}>
                    <img src={menuOpen ? '/img/menu_open.svg':'/img/menu.svg'} />
                </button>
                <HeaderNav navLinks={[...content.content.nav_links_left, ...content.content.nav_links_right]} location={location} mobile={true} menuOpen={menuOpen}/>
            </div>
        </header>
    )
}