import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function HeaderNav ({navLinks, mobile, location, menuOpen}) {

    return (
        <nav className={`header__nav${mobile ? ' header__nav--mobile':''}${menuOpen ? ' header__nav--open':''}`}>
            <ul>
                {navLinks.map((navItem, index) => (
                    <Link href={`/${navItem.slug}`} key={`headerlink--${index}`}><li>{navItem.name}</li></Link>
                ))}
            </ul>
        </nav>
    )
}