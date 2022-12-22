import { getTracks, getPage } from '../lib/api'
import { useState, useEffect } from 'react'
import Layout from '../components/layout'
import ListenPlayer from '../components/listen/listenPlayer'
import router from 'next/router';

const Index = ({ tracks }) => {


    const [firstPlay, setFirstPlay] = useState(true)
    return (

      <Layout intro={true}>
        <div>
        {!firstPlay && <header className='player__header' onClick={() => router.push('/home')}>
            <h1>Interlude</h1>
        </header>}
        <ListenPlayer trackList={tracks} intro={true} firstPlay={firstPlay} setFirstPlay={setFirstPlay}/>
        </div>
      </Layout>

    )
}

export default Index

export async function getStaticProps({ preview = null }) {
    const tracks = (await getTracks(preview)) || []
    // const content = (await getPage('pages/listen')) || []
    return {
        props: { 
            // content, 
            tracks 
        }
    }
}

