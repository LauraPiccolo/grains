import { getNav, getContact } from '../lib/api'
import Layout from '../components/layout'
import ContactWrapper from '../components/contact/contactWrapper';

const Contact = ({ content, navContent }) => {

    return (

      <Layout pageTitle={'contact'} navContent={navContent}>
        <ContactWrapper content={content.content} />
      </Layout>

    )
}

export default Contact

export async function getStaticProps({ preview = null }) {

    const content = (await getContact()) || []
    const navContent = (await getNav()) || [];

    return {
        props: { 
            content: content, 
            navContent: navContent,
        }
    }
}

