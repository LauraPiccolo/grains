import { getNav, getAbout } from '../lib/api'
import Layout from '../components/layout'
import AboutWrapper from '../components/about/aboutWrapper';

const About = ({ content, navContent }) => {

    return (

      <Layout pageTitle={'about'} navContent={navContent}>
        <AboutWrapper content={content.content} />
      </Layout>

    )
}

export default About

export async function getStaticProps({ preview = null }) {

    const content = (await getAbout()) || []
    const navContent = (await getNav()) || [];

    return {
        props: { 
            content: content, 
            navContent: navContent,
        }
    }
}

