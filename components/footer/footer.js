import Link from 'next/link'


const Footer = ({ settings }) => {

    const scrollTop = () => {
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: 0
        });
    }

    const displayImpressum = () => {
        // Display impressum
    }

    return (
        <footer>
            <p className="footer__brand">Kopf & Kragen ©2020</p>
            <p className="footer__top" onClick={scrollTop}>Zurück zum Anfang</p>
            <p className="footer__impressum" onClick={displayImpressum}>Impressum/Datenschutz</p>
        </footer>
    )
}
  
export default Footer
