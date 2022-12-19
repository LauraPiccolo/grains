import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ProjectItemMedia from './projectItemMedia';

export default function ProjectItem ({content}) {

    return (
        <article className='projectItem'>
            <Link href={`/projects/${content.slug}`}>
                <ProjectItemMedia item={content} />
                <h3 className='projectItem__client'>{content.content.client}</h3>
                <h2 className='projectItem__title'>{content.content.title}</h2>
            </Link>
        </article>
    )
}