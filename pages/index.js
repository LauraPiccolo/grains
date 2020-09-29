import Layout from '../components/layout'
import Sections from '../components/sections/sections'
import { getHome } from '../lib/api'

const Home = ({ content }) => {

    console.log(content)

    return (
        <>
        <Layout>
            <main>
                <div className="intro">
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

