
import React, { useEffect, useState } from "react";

export default function Credits({ credits}) {

  return (
    <div className="project__credits">
        <h3>Credits</h3>
        <ul>{
            credits.map((credit, index) => (
                <li  key={`credit--${index}`}>
                    <p className="credit__job">{credit.job_title}</p>
                    {credit.link.url ? (
                        <a href={credit.link.url} target="_blank">{credit.name}</a>
                    ):(
                        <p className="credit__name">{credit.name}</p>
                    )
                }</li>
            ))
            }</ul>
    </div>
  );
}
