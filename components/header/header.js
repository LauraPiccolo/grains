import Link from 'next/link';

const Header = ({ settings }) => {

    const sectionsBig = ['Businessfotografie','Bewerbungsfotos','Industriereportage'];
    const sectionsSmall = ['Studio', 'Preise', 'Kontakt'];

    const toggleMenu = () => {
        // Display menu
        const menuIsOpen = document.querySelector('.menu').clientHeight > 10 ? true : false;
        document.querySelector('.menu').style.height = menuIsOpen ? 0 : 'calc(100% - 24px)';
        document.querySelector('.menu *').style.opacity = menuIsOpen ? 0 : 1;
        document.querySelector('.menu footer').style.opacity = menuIsOpen ? 0 : 1;
    }

    const scrollToSection = (event) => {
        // scroll to desired section
        event.preventDefault();
        const anchor = document.querySelector(event.target.dataset.href);

        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: anchor.offsetTop - 24
        });

        // put little dot
        document.querySelector('.nav__section.active').className = 'nav__section';
        event.target.className = "nav__section active";
    }

    return (
    <header className="header">
        <div className="header__brand">Kopf & Kragen</div>
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
        <button onClick={toggleMenu} className="nav__menu col-3">Menu</button> 
    </header>
    )
}
  
export default Header
