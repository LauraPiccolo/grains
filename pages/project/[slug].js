import React, { useState, useEffect } from 'react';
import { getProjects, getNav, getProject } from '../lib/api';
import Layout from '../components/layout';
import BlockWrapper from '../components/pageBlocks/blockWrapper';

const Project = ({ content, navContent, projectList }) => {


    console.log(content);
    return (
        <Layout
            pageTitle={content.title}
            navContent={navContent}
        >
            <BlockWrapper blockList={content.content} projectList={projectList}/>
        </Layout>
    )
}

export const getStaticPaths = async () => {
    const data = await getProjects() || []
    return {
       paths: data.map((story) => `/${story.slug}`),
       fallback: false
    };
 };
 
 export const getStaticProps = async ({ params }) => {

    // const relation = params.slug === home ? 
    const data = (await getProject(`projects/${params.slug}`)) || [];
    const navContent = (await getNav()) || [];
    const projectList = await getProjects() || []

 
    return {
       props: {
          content: data.content,
          navContent: navContent,
          projectList: projectList
       }
    };
};

export default Project;