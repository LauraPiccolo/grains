import { getNav, getPage, getTracks } from '../lib/api'
import Layout from '../components/layout'
import ListenPlayer from '../components/listen/listenPlayer'

const About = ({ content, navContent, tracks }) => {

    return (

      <Layout pageTitle={'listen'} navContent={navContent}>
        <ListenPlayer trackList={tracks} intro={false}/>
      </Layout>

    )
}

export default About

export async function getStaticProps({ preview = null }) {

    const content = (await getPage('/pages/listen')) || []
    const navContent = (await getNav()) || [];
    const tracks = (await getTracks(preview)) || [] 

    return {
        props: { 
            content: content, 
            navContent: navContent,
            tracks: tracks
        }
    }
}

