import React, { useState, useEffect } from 'react';
import { getProjects, getNav, getProject } from '../../lib/api';
import Layout from '../../components/layout';
import Hero from '../../components/projectBlocks/hero';
import DescriptionWrapper from '../../components/projectBlocks/descriptionWrapper';
import SupportingVideos from '../../components/projectBlocks/supportingVideos';
import ProjectNav from '../../components/projectBlocks/projectNav';

const Project = ({ content, navContent, projectList }) => {


    console.log(content);
    return (
        <Layout
            pageTitle={content.content.title}
            navContent={navContent}
        >
            <main className='project-wrapper'>
                <Hero url={content.content.fullscreen_video.url} />
                <DescriptionWrapper 
                    title={content.content.title}
                    description={content.content.description}
                    credits={content.content.credits}
                    url={content.content.fullscreen_video.url}
                    client={content.content.client}
                    category={content.content.category}
                    slug={content.slug} 
                />
                <SupportingVideos videoList={content.content.supporting_videos} />
                <ProjectNav
                    projectList={projectList}
                    project={content}
                />
            </main>
        </Layout>
    )
}

export const getStaticPaths = async () => {
    const data = await getProjects() || []
    return {
       paths: data.map((story) => `/projects/${story.slug}`),
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
          content: data,
          navContent: navContent,
          projectList: projectList
       }
    };
};

export default Project;