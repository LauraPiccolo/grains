import Layout from '../components/layout'
import { getHome } from '../lib/api'

import Intro from '../components/sections/intro'
import Work from '../components/sections/work'

const Home = ({ content }) => {

    console.log(content)

    return (
        <>
        <Layout>
            <main>
            <Intro content={content} />
            <Work content={content.Businessfotografie} />

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

