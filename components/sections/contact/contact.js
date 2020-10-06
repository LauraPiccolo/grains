import ContactForm from './contactForm'
import Mailchimp from 'react-mailchimp-form'
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react'

const StoryblokClient = require('storyblok-js-client')

let Storyblok = new StoryblokClient({
    accessToken: 'zpjVfToBDoqLTFrpreoYMwtt'
})

const Contact = ({ content }) => {

    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0,
    });

    // Function to call after current section className has been found
    const changeActiveSection = (sectionClass) => {
        document.querySelector('.nav__section.active').className = 'nav__section';
        document.querySelector(`a[data-href='.${sectionClass}']`).className = "nav__section active";
    }

    useEffect(() => {
        if(inView) changeActiveSection('kontakt');
    },[inView])

    let address = Storyblok.richTextResolver.render(content.contact_address)
    let info = Storyblok.richTextResolver.render(content.contact_info)

    return (
        <section className="kontakt" ref={ref}>
            <div className="kontakt__address" dangerouslySetInnerHTML={{ __html: address }}></div>
            <div className="kontakt__kontakt" dangerouslySetInnerHTML={{ __html: info }}></div>
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
            <ContactForm />
        </section>
    )
}
  
export default Contact
