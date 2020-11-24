import $ from 'jquery';

const Footer = ({ }) => {

    const scrollTop = () => {
        $('html, body').animate({
            scrollTop: 0
        }, 800)
    }

    const displayImpressum = () => {
        document.querySelector('.impressum').style.display = 'grid';
        $('html, body').animate({
            scrollTop: $('.impressum').offset().top - 24
        }, 800)
    }

    return (
        <footer>
            <p className="footer__top footer__top--mobile" onClick={scrollTop}>Zurück zum Anfang</p>
            <p className="footer__brand">Kopf & Kragen ©2020</p>
            <p className="footer__top footer__top--desktop" onClick={scrollTop}>Zurück zum Anfang</p>
            <p className="footer__impressum" onClick={displayImpressum}>Impressum/Datenschutz</p>
        </footer>
    )
}
  
export default Footer
