import Layout from '../components/layout'
import { getHome } from '../lib/api'
import Wrapper from '../components/block/wrapper'
import { useState } from 'react'
import Header from '../components/header/header'
import Information from '../components/information/information'


const Home = ({ content }) => {
    console.log(content)

    const [lang, setLang] = useState('en')

    return (
        <Layout content={content}>
            {/* <main className="viewport-block">
            <Intro content={content} />
            <Work content={content.Businessfotografie} anchor="businessfotografie"/>
            <Work content={content.Bewerbungsfotos} anchor="bewerbungsfotos"/>
            <Work content={content.Industriereportage} anchor="industriereportage"/>
            <Work content={content.Studio} anchor="studio"/>
            <Work content={content.Preise} anchor="preise"/>
            <Contact content={content} />
            </main> */}
            <Header lang={lang} setLang={setLang} />
            <Wrapper blocks={content.blocks} lang={lang}/>
            <Information lang={lang} />
        </Layout>
    )
}

export default Home

export async function getStaticProps({ preview = null }) {
    const content = (await getHome(preview)) || []
    return {
        props: { content },
    }
}

