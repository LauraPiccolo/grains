import React, { useEffect, useState } from 'react';

export default function KeyWord ({word}) {

    const [finalWord, setFinalWord] = useState(word);

    const theLetters = "abcdefghijklmnopqrstuvwxyz#%&^+=-"; //You can customize what letters it will cycle through
    let ctnt = word; // Your text goes here
    let speed = 12; // ms per frame
    let increment = 3; // frames per step. Must be >2
    
    let clen = ctnt.length;       
    let si = 0;
    let stri = 0;
    let block = "";
    let fixed = "";

    useEffect(() => {
        rustle(clen*increment+1) 
    }, [word])

    const rustle = (i) => {          
        setTimeout(() => {
            if (--i) { rustle(i);}
            nextFrame(i);
            si = si + 1;        
        }, speed);
    };

    const nextFrame = (pos) =>{
      for (let i=0; i<clen-stri; i++) {
        //Random number
        let num = Math.floor(theLetters.length * Math.random());
        //Get random letter
        let letter = theLetters.charAt(num);
        block = block + letter;
      }
      if (si == (increment-1)){
        stri++;
      }
      if (si == increment){
        // Add a letter; 
        // every speed*10 ms
        // if(transitioning) fixed = fixed + ' '
        // else 
        fixed = fixed +  ctnt.charAt(stri - 1);
        si = 0;
      }

      setFinalWord(fixed + block);
      block = "";
    }

    return (
        <>
           {finalWord}
        </>
    )
}