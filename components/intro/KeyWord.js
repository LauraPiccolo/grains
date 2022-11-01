import React, { useEffect, useState } from 'react';

export default function KeyWord ({word, blockspeed, lang}) {

    const [finalWord, setFinalWord] = useState(word);

    const theLetters = lang === 'en' ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ":"日事人一見本子出年大言学分中記会新月時行気報思上語自者生文明情国朝用書私手間小合方社検目前入索関作特何女今体動集発最内投下知地場別話部化告法広来田理物開全説聞表連無対的高教感心以成名業長家稿定実山近現後金覧男画性度数立彼問二意能個僕通面回代木利経使車編同平音読少食道世結力楽真品考";
    let ctnt = word; // Your text goes here
    let speed = 12/blockspeed; // ms per frame
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
        let letter = word[i] === ' ' ? ' ' : theLetters.charAt(num);
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
        <p>
           {finalWord}
        </p>
    )
}