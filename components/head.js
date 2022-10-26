import React from 'react'
import NextHead from 'next/head'

const Head = () => {

    return (
        <NextHead>
            <meta charSet="UTF-8" />
            <title>VISUAL ASSOCIATES</title>
            <meta name="description" content="description" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <meta property="og:title" content="VISUAL ASSOCIATES"></meta>
            <meta property="og:type" content="Visual studio"></meta>
            <meta property="og:url" content="visualassociates"></meta>
            <meta property="og:image" content="/ogimage.jpg"></meta>
            <meta property="og:site_name" content="VISUAL ASSOCIATES"></meta>
            <meta property="og:description" content="description"></meta>
        </NextHead>
    )

}


export default Head



