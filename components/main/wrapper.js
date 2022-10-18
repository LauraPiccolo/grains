import React from "react";
import Block from "./item";
import Information from "../information/information";

const Wrapper = ({ blocks, lang }) => {
  // console.log(blocks);

  return (
        <div data-scroll-section id="scroll-wrapper">
        {blocks.map((block, index) => (
          <Block block={block} lang={lang} last={index === blocks.length - 1} index={index}/>
        ))}
        
        <Information lang={lang} />

        {blocks.map((block, index) => (
          index === 0 && <Block block={block} lang={lang} index={index} last={false} first={true}/>
        ))}
        </div>

  );
};

export default Wrapper;
