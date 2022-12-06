import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function HeaderNav ({navLinks}) {

    console.log(navLinks)

    return (
        <nav className='header__nav'>
            <ul>
                {navLinks.map((navItem) => (
                    <Link href={navItem.slug}><li>{navItem.name}</li></Link>
                ))}
            </ul>
        </nav>
    )
}