import Layout from '../components/layout'
import Sections from '../components/sections/sections'
import { getHome } from '../lib/api'
import Mailchimp from 'react-mailchimp-form'

const Home = ({ content }) => {

    console.log(content)

    return (
        <>
        <Layout>
            <main>
                <div className="intro">
                    <div className="intro__address">
                        Sanderstr. 29–30
                        <br/>12047 Berlin, Germany
                    </div>

                    <div className="intro__contact">
                        info@kopfundkragen.eu 
                        <br/>+49 (0)30 89 56 69 41
                        <br/>@kopfundkragen_fotografie
                    </div>

                    <div className="intro__newsletter">
                        Newsletter
                        <Mailchimp
                        action='https://googlemail.us4.list-manage.com/subscribe/post?u=42451f8640431cce08fcfc879&amp;id=70d98ca351'
                        fields={[
                        {
                            name: 'email',
                            placeholder: 'E-Mail Adresse eingeben',
                            type: 'email',
                            required: true
                        }]}
                        messages = {
                            {
                                // sending: "Sending...",
                                // success: "Thank you for subscribing!",
                                // error: "An unexpected internal error has occurred.",
                                // empty: "You must write an e-mail.",
                                // duplicate: "Too many subscribe attempts for this email address",
                                button: "Abonnieren"
                            }
                        }
                        />
                    </div>
                </div>
                <div className="anker">
                    <Sections content={content} />
                </div>
            </main>
        </Layout>
        </>
    )
}

export default Home

export async function getStaticProps({ preview = null }) {
    const content = (await getHome(preview)) || []
    return {
        props: { content },
    }
}

