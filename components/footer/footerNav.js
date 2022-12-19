import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function FooterNav ({navLinks}) {

    console.log(navLinks)

    return (
        <nav className='footer__nav'>
            <ul>
                {navLinks.map((navItem, index) => (
                    <Link href={navItem.slug} key={`footerlink--${index}`}><li>{navItem.name}</li></Link>
                ))}
            </ul>
        </nav>
    )
}