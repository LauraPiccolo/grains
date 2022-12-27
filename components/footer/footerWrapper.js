import React, { useEffect, useState } from 'react';
import FooterNav from './footerNav';
import FooterText from './footerText';

export default function FooterWrapper ({location, content}) {

    return (
        <footer className="footer">
            <FooterText content={content.content.description} />
            <div className='footer__nav--mobile'>
                <FooterNav navLinks={content.content.nav_links_left} location={location}/>
                <FooterNav navLinks={content.content.nav_links_right} location={location}/>
            </div>
            <FooterNav navLinks={content.content.nav_links_left} location={location}/>
            <FooterNav navLinks={content.content.nav_links_right} location={location}/>
            <div className='footer__footer'>
                <p>©Interludesounds 2023</p>
                <a href="https://matinee-studio.com/" target="_blank">Design:MATINÉE</a>
            </div>
        </footer>
    )
}