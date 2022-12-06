import { getTracks, getPage } from '../lib/api'
import { useState, useEffect } from 'react'
import Layout from '../components/layout'
import ListenPlayer from '../components/listen/listenPlayer'
import router from 'next/router';

const Index = ({ tracks }) => {

    return (

      <Layout intro={true}>
        <header className='player__header'>
            <h1 onClick={() => router.push('/home')}>Interlude</h1>
        </header>
        <ListenPlayer trackList={tracks} intro={true}/>
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

