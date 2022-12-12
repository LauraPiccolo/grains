
import React, { useEffect, useState } from "react";
import { render } from "storyblok-rich-text-react-renderer";

export default function Description({ title, description}) {

  return (
    <div className="project__description">
        <h1>{title}</h1>
        <div>
            {render(description)}
        </div>
    </div>
  );
}
