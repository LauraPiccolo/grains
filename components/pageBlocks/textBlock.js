
import React, { useEffect, useState } from 'react';
import { render } from 'storyblok-rich-text-react-renderer';

export default function TextBlock ({title, text}) {

    return (
        <header className='page-content__header'>
            <h1>{title}</h1>
            <div className='page-content__header__description'>{render(text)}</div>
        </header>
    )
}