import React, { useState, useEffect } from 'react';
import { getPage, getPages, getNav, getProjects } from '../lib/api';
import Layout from '../components/layout';
import TextBlock from '../components/pageBlocks/textBlock';
import BlockWrapper from '../components/pageBlocks/blockWrapper';

const Page = ({ content, navContent, projectList }) => {


    console.log(content.description);
    return (
        <Layout
            pageTitle={content.title.toLowerCase()}
            navContent={navContent}
        >
            {content.title !== 'Home' && <TextBlock title={content.title} text={content.description} />}
            <BlockWrapper blockList={content.content} projectList={projectList}/>
        </Layout>
    )
}

export const getStaticPaths = async () => {
    const data = await getPages() || []
    return {
       paths: data.map((story) => `/${story.slug}`),
       fallback: false
    };
 };
 
 export const getStaticProps = async ({ params }) => {

    // const relation = params.slug === home ? 
    const data = (await getPage({id:`pages/${params.slug}`, resolve_relations: "slider.project_list,double_block.right_project,double_block.left_project,single_block.project"})) || [];
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

export default Page;