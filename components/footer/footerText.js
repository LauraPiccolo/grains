import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { render } from 'storyblok-rich-text-react-renderer';

export default function FooterText ({content}) {

    return (
        <div className='footer__text'>
           {render(content)}
        </div>
    )
}