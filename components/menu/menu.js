import Intro from '../sections/intro/intro';
import Footer from '../footer/footer';
import $ from 'jquery';

const Menu = ({ content }) => {

  const sectionsBig = ['Businessfotografie','Bewerbungsfotos','Industriereportage'];
  const sectionsSmall = ['Studio', 'Preise', 'Kontakt']

  const closeMenu = () => {
      // Close menu
      document.querySelector('.menu').style.height = 0;
      document.querySelector('.menu *').style.opacity = 0;
      document.querySelector('.menu footer').style.opacity = 0;
  }

  const scrollToSection = (event) => {
      // scroll to desired section
      event.preventDefault();
      closeMenu();
      const anchor = document.querySelector(event.target.dataset.href);

      $('html, body').animate({
        scrollTop: $(anchor).offset().top - 24
    }, 800)

      // put little dot
      document.querySelector('.nav__section.active').className = 'nav__section';
      event.target.className = "nav__section active";
  }

  return (
  <div className="menu">
      <Intro content={content} />
      <nav className="menu__nav menu__nav--big">
          <ul>
              {
                  sectionsBig.map((sectionName, index) => (
                      <li key={`bigSection--${index}--menu`} className={`nav__section ${index === 0 ? 'active':''}`}>
                          <a onClick={(event) => scrollToSection(event)} data-href={`.${sectionName.toLowerCase()}`}>         
                              {sectionName}
                          </a>
                      </li>
                  ))
              }
          </ul> 
      </nav>
      <nav className="menu__nav menu__nav--small">
          <ul>
              {
                  sectionsSmall.map((sectionName, index) => (
                      <li className="nav__section" key={`smallSection--${index}--menu`} >
                          <a onClick={(event) => scrollToSection(event)} data-href={`.${sectionName.toLowerCase()}`}>
                              {sectionName}
                          </a>
                      </li>
                  ))
              }
          </ul>    
      </nav>
      <Footer />   
  </div>
  )
}

export default Menu

