import { getNav, getPage, getTracks } from '../lib/api'
import Layout from '../components/layout'
import ListenPlayer from '../components/listen/listenPlayer'
import { useState } from 'react'

const Listen = ({ content, navContent, tracks }) => {

  const [firstPlay, setFirstPlay] = useState(true)

    return (

      <Layout pageTitle={'listen'} navContent={navContent}>
        <ListenPlayer trackList={tracks} intro={false} firstPlay={firstPlay} setFirstPlay={setFirstPlay}/>
      </Layout>

    )
}

export default Listen

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

