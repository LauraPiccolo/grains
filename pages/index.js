import Layout from '../components/layout'
import { getHome } from '../lib/api'

import Intro from '../components/sections/intro/intro'
import Work from '../components/sections/work'
import Contact from '../components/sections/contact/contact'
import Footer from '../components/footer/footer'

const Home = ({ content }) => {

    console.log(content.Bewerbungsfotos)

    return (
        <>
        <Layout>
            <main>
            <Intro content={content} />
            <Work content={content.Businessfotografie} />
            <Work content={content.Bewerbungsfotos} />
            <Work content={content.Industriereportage} />
            <Work content={content.Studio} />
            <Work content={content.Preise} />
            <Contact content={content} />
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

