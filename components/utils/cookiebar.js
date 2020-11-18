import CookieConsent from "react-cookie-consent"
import Link from 'next/link'

const Cookiebar = () => {

    let text = "We use cookies."
    let info = "Learn more."

    return (
        <CookieConsent  disableStyles="true" buttonText="Accept" cookieName="myAwesomeCookieName2" expires={150} >
                {text}<Link href={`/datenschutz`} ><a>{info}</a></Link>
        </CookieConsent>
    )
}
  
export default Cookiebar