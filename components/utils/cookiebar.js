import CookieConsent from "react-cookie-consent"
import $ from 'jquery';

const Cookiebar = () => {

    let text = "We use cookies. "
    let info = "Learn more."

    const displayImpressum = () => {
        document.querySelector('.impressum').style.display = 'grid';
        $('html, body').animate({
            scrollTop: $('.impressum').offset().top - 44
        }, 800)
    }

    const removeCookie = () => {
        document.querySelectorAll('.CookieConsent')[0].style.display = 'none';
    }

    return (
        <CookieConsent  onAccept={removeCookie} disableStyles="true" buttonText="Accept" cookieName="myAwesomeCookieName2" expires={150} >
                {text}<a onClick={displayImpressum}>{info}</a>
        </CookieConsent>
    )
}
  
export default Cookiebar