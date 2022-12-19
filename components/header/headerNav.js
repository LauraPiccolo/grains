import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function HeaderNav ({navLinks}) {

    return (
        <nav className='header__nav'>
            <ul>
                {navLinks.map((navItem, index) => (
                    <Link href={`/${navItem.slug}`} key={`headerlink--${index}`}><li>{navItem.name}</li></Link>
                ))}
            </ul>
        </nav>
    )
}