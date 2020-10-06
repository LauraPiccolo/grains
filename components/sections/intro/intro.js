import Mailchimp from 'react-mailchimp-form'

const StoryblokClient = require('storyblok-js-client')

let Storyblok = new StoryblokClient({
    accessToken: 'zpjVfToBDoqLTFrpreoYMwtt'
})


const Intro = ({ content }) => {

    let address = Storyblok.richTextResolver.render(content.contact_address)
    let info = Storyblok.richTextResolver.render(content.contact_info)

    return (
        <section className="intro">
            <div className="intro__address" dangerouslySetInnerHTML={{ __html: address }}></div>
            <div className="intro__kontakt" dangerouslySetInnerHTML={{ __html: info }}></div>
            <div className="intro__newsletter">
                Newsletter
                <Mailchimp
                action='https://googlemail.us4.list-manage.com/subscribe/post?u=42451f8640431cce08fcfc879&amp;id=70d98ca351'
                fields={[
                {
                    name: 'EMAIL',
                    placeholder: 'E-Mail Adresse eingeben',
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
                        button: "Abonnieren"
                    }
                }
                />
            </div>
    </section>
    )
}
  
export default Intro
