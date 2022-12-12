
import React, { useEffect, useState } from "react";
import Description from "./description";
import Credits from "./credits";

export default function DescriptionWrapper({ title, description, credits, url, client, category, slug}) {

  return (
    <div className="project__description">
        <Description title={title} description={description} category={category} client={client} slug={slug}/>
        <Credits credits={credits}/>
        <button className="project__share">
            SHARE
        </button>
    </div>
  );
}
