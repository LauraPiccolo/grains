import Layout from '../components/layout'
import { getHome } from '../lib/api'

import Intro from '../components/sections/intro/intro'
import Work from '../components/sections/work'
import Contact from '../components/sections/contact/contact'
import Footer from '../components/footer/footer'

const Home = ({ content }) => {

    return (
        <>
        <Layout>
            <main>
            <Intro content={content} />
            <Work content={content.Businessfotografie} />
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

