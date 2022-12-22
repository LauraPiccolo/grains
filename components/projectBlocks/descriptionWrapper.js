
import React, { useEffect, useState } from "react";
import Credits from "./credits";
import ProjectHeader from "./projectHeader";
import { render } from "storyblok-rich-text-react-renderer";

export default function DescriptionWrapper({ title, description, credits, url, client, category, slug}) {

  const [copying, setCopying] = useState(false)

  const share = () => {
    navigator.clipboard.writeText(url);
    setCopying(true)
    setTimeout(() => {
      setCopying(false);
    }, 2500)
  }

  return (
    <div className="project__content">
        <ProjectHeader title={title} description={description} category={category} client={client} slug={slug}/>
        <div className="project__content__block">
          <div className="project__description">
              {render(description)}
          </div>
          <Credits credits={credits}/>
          <button className="project__share" onClick={share}>
              {copying ? 'Linked copied':'Share'} <img src="/img/share.svg" />
          </button>
        </div>
    </div>
  );
}
