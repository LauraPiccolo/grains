import React, { useEffect, useState } from "react";
import DoubleProjectBlock from "./doubleProjectBlock";
import SingleProjectBlock from "./singleProjectBlock";
import Slider from "./slider";

export default function BlockWrapper({ blockList, projectList }) {
  return (
    <div className="page-blocks">
      {blockList.map((block, index) => {
        switch (block.component) {
          case "slider":
            return <Slider content={block} projectList={projectList} key={`block--${index}`}/>;
          case "doubleProject":
            return <DoubleProjectBlock content={block} projectList={projectList} key={`block--${index}`}/>;
          case "singleProject":
            return <SingleProjectBlock content={block} projectList={projectList} key={`block--${index}`}/>;
        }
      })}
    </div>
  );
}
