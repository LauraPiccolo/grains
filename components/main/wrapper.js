import React from "react";
import Block from "./item";

const Wrapper = ({ blocks, lang }) => {

  return (
        <div data-scroll-section id="scroll-wrapper">
        {blocks.map((block, index) => (
          <Block block={block} lang={lang} last={index === blocks.length - 1} index={index}/>
        ))}
        </div>

  );
};

export default Wrapper;
