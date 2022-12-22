
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "../utils/image";

export default function NavVideoItem({ content, type}) {
    console.log(content)
  return (
    <Link href={`/projects/${content.slug}`}>
        <div className="project__nav__item">
            <Image data={content.content.hero_video_poster.filename !== '' ? content.content.hero_video_poster : content.content.hero_media} />
            <header>
              <span>{type} Project</span>
              <h2>{content.name}</h2>
            </header>
        </div>
    </Link>
  );
}
