import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { render } from 'storyblok-rich-text-react-renderer';

export default function ContactWrapper ({content}) {

    console.log(content.email)

    return (
        <main className='contact__main'>
          <div className='contact__main__text'>
            {render(content.paragraph_content)}
          </div>
          <a className='contact__main__email' href={`mailto:${content.email.url}`}>{content.email.url}</a>
          <nav>
            <ul>
                <li><a href={content.instagram_link.url} target="_blank">Instagram</a></li>
                <li><a href={content.vimeo_link.url} target="_blank">Vimeo</a></li>
            </ul>
          </nav>
          <footer className='contact__footer'>
                <p>©Interludesounds 2023</p>
                <a href="https://matinee-studio.com/" target="_blank">Design:MATINÉE</a>
            </footer>
        </main>
    )
}