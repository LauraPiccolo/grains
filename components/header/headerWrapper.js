import React, { useEffect, useState } from 'react';
import HeaderNav from './headerNav';

export default function HeaderWrapper ({location, content, inverted}) {

    return (
        <header className={`header${inverted ? ' header--inverted':''}`}>
            <HeaderNav navLinks={content.content.nav_links_left} location={location}/>
            <h1>INTERLUDE</h1>
            <HeaderNav navLinks={content.content.nav_links_right} location={location}/>
        </header>
    )
}