import React, { useEffect, useState } from 'react';
import ProjectItem from './projectItem';

export default function SingleProjectBlock ({content}) {

    return (
        <div className='single-project-block block'>
            <ProjectItem content={content.project} />
        </div>
    )
}