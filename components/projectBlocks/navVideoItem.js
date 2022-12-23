
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProjectItemMedia from "../pageBlocks/projectItemMedia";

export default function NavVideoItem({ content, type}) {
    console.log(content)
  return (
        <div className="project__nav__item">
            <ProjectItemMedia item={content} />
            <header>
              <span>{type} Project</span>
              <h2>{content.name}</h2>
            </header>
        </div>
  );
}
