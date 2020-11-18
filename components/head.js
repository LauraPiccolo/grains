import React from 'react'
import NextHead from 'next/head'

const Head = () => {

    return (
        <NextHead>
            <meta charSet="UTF-8" />
            <title>Bewerbungsfotos Berlin & Businessportraits Berlin - Kopf & Kragen Fotografie</title>
            <meta name="description" content="Studio für Fotografie Berlin / Mietstudio / Rentstudio
  Hinter Kopf und Kragen steht der Gedanke, hochwertige und individuelle Portraits gemeinsam mit unseren Kunden zu erarbeiten.
  Das Studio mit Wohnzimmeratmosphäre bietet Raum für einzigartige Fotoproduktionen und ein charmantes Ambiente." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <meta property="og:title" content="Kopf &amp; Kragen - Bewerbungs- und Firmenportraits"></meta>
            <meta property="og:type" content="company"></meta>
            <meta property="og:url" content="http://www.kopfundkragen.eu"></meta>
            <meta property="og:image" content="/ogimage.jpg"></meta>
            <meta property="og:site_name" content="Kopf &amp; Kragen"></meta>
            <meta property="og:description" content="Studio für Fotografie Berlin / Mietstudio / Rentstudio
  Hinter Kopf und Kragen steht der Gedanke, hochwertige und individuelle Portraits gemeinsam mit unseren Kunden zu erarbeiten.
  Das Studio mit Wohnzimmeratmosphäre bietet Raum für einzigartige Fotoproduktionen und ein charmantes Ambiente."></meta>

            <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-7WPX8F14EQ"
            />
            <script
            dangerouslySetInnerHTML={{
            __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-7WPX8F14EQ');
                `,
            }}
            />
        </NextHead>
    )

}


export default Head



