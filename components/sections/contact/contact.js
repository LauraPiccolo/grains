import ContactForm from './contactForm'
import Mailchimp from 'react-mailchimp-form'

const Contact = ({ content }) => {

    return (
        <section className="kontakt">
            <div className="kontakt__address">
                Sanderstr. 29–30
                <br/>12047 Berlin, Germany
            </div>
            <div className="kontakt__kontakt">
                info@kopfundkragen.eu 
                <br/>+49 (0)30 89 56 69 41
                <br/>@kopfundkragen_fotografie
            </div>
            <ContactForm />
            <div className="kontakt__newsletter">
                Newsletter
                <Mailchimp
                action='https://googlemail.us4.list-manage.com/subscribe/post?u=42451f8640431cce08fcfc879&amp;id=70d98ca351'
                fields={[
                {
                    name: 'EMAIL',
                    placeholder: 'Enter email address',
                    type: 'email',
                    required: true
                }]}
                messages = {
                    {
                        // sending: "Sending...",
                        success: "Thank you for subscribing!",
                        error: "An unexpected internal error has occurred.",
                        empty: "You must write an e-mail.",
                        // duplicate: "Too many subscribe attempts for this email address",
                        button: "Subscribe"
                    }
                }
                />
            </div>
        </section>
    )
}
  
export default Contact
