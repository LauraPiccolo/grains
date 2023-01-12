import ListenVisualWrapper from '../components/listen/listenVisualWrapper'

const Index = ({ }) => {

    return (
        <ListenVisualWrapper />
    )
}

export default Index

export async function getStaticProps({ preview = null }) {
    // const tracks = (await getTracks(preview)) || []
    // const content = (await getPage('pages/listen')) || []
    return {
        props: { 
            // content, 
            // tracks 
        }
    }
}

