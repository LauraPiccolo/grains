
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ProjectHeader({ title, description, category, client}) {

  console.log(category)

  return (
    <header className="project__header">
      <div className="project__header__left">
        <h2>{client}</h2>
        <h1>{title}</h1>
      </div>
      <Link href={`/${category.slug}`}><span className="project__header__category">{category.content.title}</span>
      </Link>
    </header>
  );
}
