import Link from 'next/link';
import CookieConsent from "react-cookie-consent"
import { useState } from 'react';
import Cookiebar from '../utils/cookiebar'
import $ from 'jquery';

const Header = ({ settings }) => {

    const sectionsBig = ['Businessfotografie','Bewerbungsfotos','Industriereportage'];
    const sectionsSmall = ['Studio', 'Preise', 'Kontakt'];
    const [menu, setMenu] = useState(false);

    const toggleMenu = () => {
        // Display menu
        const menuIsOpen = document.querySelector('.menu').clientHeight > 10 ? true : false;
        setMenu(!menuIsOpen);
        document.querySelector('.menu').style.height = menuIsOpen ? 0 : 'calc(100% - 24px)';
        document.querySelector('.menu *').style.opacity = menuIsOpen ? 0 : 1;
        document.querySelector('.menu footer').style.opacity = menuIsOpen ? 0 : 1;
    }

    const scrollToSection = (event) => {
        // scroll to desired section
        event.preventDefault();
        const anchor = document.querySelector(event.target.dataset.href);

        $('html, body').animate({
            scrollTop: $(anchor).offset().top - 24
        }, 800)

        // put little dot
        document.querySelector('.nav__section.active').className = 'nav__section';
        event.target.className = "nav__section active";
    }

    const scrollTop = () => {
        // scroll to desired section
        event.preventDefault();
        const anchor = document.querySelector('.businessfotografie');

        $('html, body').animate({
            scrollTop: $(anchor).offset().top - 24
        }, 800)
    }

    return (
    <div className="header__wrapper">
        <header className="header">
            <div className="header__brand">
                <h1 onClick={scrollTop} 
                data-href='.businessfotografie'>Kopf & Kragen</h1>
            </div>
            <nav className="header__nav header__nav--big">
                <ul>
                    {
                        sectionsBig.map((sectionName, index) => (
                            <li key={`bigSection--${index}`} className={`nav__section ${index === 0 ? 'active':''}`}>
                                <a onClick={(event) => scrollToSection(event)} data-href={`.${sectionName.toLowerCase()}`}>         
                                    {sectionName}
                                </a>
                            </li>
                        ))
                    }
                </ul> 
            </nav>
            <nav className="header__nav header__nav--small">
                <ul>
                    {
                        sectionsSmall.map((sectionName, index) => (
                            <li key={`smallSection--${index}`} className="nav__section">
                                <a onClick={(event) => scrollToSection(event)} data-href={`.${sectionName.toLowerCase()}`}>
                                    {sectionName}
                                </a>
                            </li>
                        ))
                    }
                </ul>    
            </nav>   
            <button onClick={toggleMenu} className="nav__menu col-3">{menu ? 'Close':'Menu'}</button> 
        </header>
        <Cookiebar />
        <Cookiebar />
    </div>
    )
}
  
export default Header
