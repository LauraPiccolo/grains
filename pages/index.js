import Layout from '../components/layout'
import { getHome } from '../lib/api'

const Home = ({ content }) => {

    console.log(content)

    return (
        <>
        <Layout>
            <main>
                <section>
                Hey this is Version Nr. 2
                </section>
                <section className="" >
                    <div className="textarea"></div>
                    <div className="imagegrid">
                        <article className="imagegrid__item">

                        </article>
                    </div>
                </section>
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

