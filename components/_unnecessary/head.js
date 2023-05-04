import React from 'react'
import NextHead from 'next/head'

const Head = () => {

    return (
        <NextHead>
            <meta charSet="UTF-8" />
            <title>Visual Associates</title>
            <meta name="description" content="Global agency creating campaigns, identities and digital experiences for modern brands and individuals" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico"></link>
            <meta property="og:title" content="Visual Associates"></meta>
            <meta property="og:type" content="Global agency"></meta>
            <meta property="og:url" content="visual.associates"></meta>
            <meta property="og:image" content="/ogimage.jpg"></meta>
            <meta property="og:site_name" content="Visual Associates"></meta>
            <meta property="og:description" content="Global agency creating campaigns, identities and digital experiences for modern brands and individuals"></meta>
        </NextHead>
    )

}


export default Head



