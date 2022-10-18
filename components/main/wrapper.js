import React from "react";
import Block from "./item";
import Information from "../information/information";

const Wrapper = ({ blocks, lang, scrollLocked, setScrollLocked }) => {
  // console.log(blocks);

  const checkScroll = (event) => {
    event.preventDefault()
    if(event.target.scrollTop >= event.target.scrollHeight - window.innerHeight - 50) {
      document.querySelector('.information--modal').scrollTo(0, (event.target.scrollTop + window.innerHeight ) - (event.target.scrollHeight - 50));
    }
    if(event.target.scrollTop >= event.target.scrollHeight - window.innerHeight) {
      console.log('LOCK')
      setScrollLocked(true)
      document.querySelector('.information--modal').focus();
    }
  }

  return (
        <div data-scroll-section id="scroll-wrapper" className="vph"
        style={{zIndex: scrollLocked ? 1:10}}
        onScroll={(event) => checkScroll(event)}
        >
        {blocks.map((block, index) => (
          <Block block={block} lang={lang} last={index === blocks.length - 1} index={index}/>
        ))}
        
        {/* <Information lang={lang} /> */}

        {/* {blocks.map((block, index) => (
          index === 0 && <Block block={block} lang={lang} index={index} last={false} first={true}/>
        ))} */}
        </div>

  );
};

export default Wrapper;
