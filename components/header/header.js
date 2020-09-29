import Link from 'next/link';
import { useRef } from 'react';


const Header = ({ settings }) => {

    const navLinks = useRef(null)

    const displayMenu = () => {
        // Display menu
    }

    const scrollToSection = (event) => {
        // scroll to desired section
        // put little dot
        event.target.className = ""
    }

    return (
    <header className="header">
        <div className="header__brand">Kopf & Kragen</div>
        <nav className="header__nav header__nav--big">
            <ul>
                <li className="nav__section"><a ref={navLinks} href="">Businessfotografie</a></li>
                <li className="nav__section"><a ref={navLinks} href="">Bewerbungsfotos</a></li>
                <li className="nav__section"><a ref={navLinks} href="">Industriereportage</a></li>
            </ul> 
        </nav>
        <nav className="header__nav header__nav--small">
            <ul>
                <li className="nav__section"><a ref={navLinks} href="">Studio</a></li>
                <li className="nav__section"><a ref={navLinks} href="">Preise</a></li>
                <li className="nav__section"><a ref={navLinks} href="">Kontakt</a></li>
            </ul>    
        </nav>   
        <button onClick={displayMenu} className="nav__menu col-3">Menu</button> 
    </header>
    )
}
  
export default Header
