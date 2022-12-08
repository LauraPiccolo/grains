import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { render } from 'storyblok-rich-text-react-renderer';

export default function AboutWrapper ({content}) {

    console.log(content.email)

    return (
        <main className='about__main'>
          <header className='about__main__header'>
            {render(content.header)}
          </header>
          <h2>{content.paragraph_header}</h2>
          <div className='about__main__text'>{render(content.paragraph_content)}</div>
          <footer className='about__footer'>
                <p>©Interludesounds 2023</p>
                <a href="https://matinee-studio.com/" target="_blank">Design:MATINÉE</a>
            </footer>
        </main>
    )
}