import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from './head';
import HeaderWrapper from './header/headerWrapper';
import FooterWrapper from './footer/footerWrapper';

export default function Layout ({ children, pageTitle, intro, navContent }) {

    const location = useRouter().asPath.replace('/','');
    const inverted = pageTitle === 'about' || pageTitle === 'contact' || pageTitle === 'home';

    return (
        <>
            <Head title={pageTitle}/>
            {!intro && <HeaderWrapper location={location} content={navContent} inverted={inverted}/>}
            <main className='main'>
                {children}
            </main>
            {!inverted && <FooterWrapper location={location} content={navContent} />}
        </>
    )
}