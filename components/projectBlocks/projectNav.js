
import React, { useEffect, useState } from "react";
import NavVideoItem from "./NavVideoItem";

export default function ProjectNav({ projectList, project}) {

    const categoryProjects = projectList.filter((projectItem, index) => projectItem.content.category.slug === project.content.category.slug);
    const indexProject = categoryProjects.findIndex((projectItem) => projectItem.slug === project.slug);
    const prevProject = categoryProjects[indexProject - 1 < 0 ? categoryProjects.length -1 : indexProject -1];
    const nextProject = categoryProjects[indexProject + 1 >= categoryProjects.length ? 0 :indexProject + 1];

  return (
    <div className="project__credits">
        <NavVideoItem type="previous" content={prevProject} />
        <NavVideoItem type="next" content={nextProject} />
    </div>
  );
}
