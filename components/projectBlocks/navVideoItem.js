
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "../utils/image";

export default function NavVideoItem({ content, type}) {
    console.log(content)
  return (
    // <div>LO</div>
    <Link href={`/projects/${content.slug}`}>
        <div className="project__nav__item">
            <Image data={content.content.poster || content.content.hero_media} />
            <span>{type} Project</span>
            <h2>{content.name}</h2>
        </div>
    </Link>
  );
}
