import React, { useEffect, useState } from 'react';
import ProjectItem from './projectItem';

export default function DoubleProjectBlock ({content}) {

    console.log(content);

    return (
        <div className='double-project-block block'>
            <ProjectItem content={content.left_project} />
            <ProjectItem content={content.right_project} />
        </div>
    )
}