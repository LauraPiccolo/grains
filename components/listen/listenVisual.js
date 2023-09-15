import React, { useEffect, useRef } from "react";
import useState from 'react-usestateref';
import "./glsl/raf.js";
import Clubber from "clubber";
import { AudioContext } from "standardized-audio-context";
import Letter from "./letter.js";

let rafID;
let mic;
let fb1;
let fb2;
let tmp;
let audioContext;
let analyser;
let numPoints;
let frequencyData;
let now = 0;
let then = 0;
// let fps = 360;
let fps = 15;
let interval = 1000 / fps;
let fftSize = 128;
let clubber;
let bands = {};

const iMusicLow = [0.0, 0.0, 0.0, 0.0];
const iMusicG = [0.0, 0.0, 0.0, 0.0];
const iMusicR = [0.0, 0.0, 0.0, 0.0];
const iMusicA = [0.0, 0.0, 0.0, 0.0];
const iMusicI = [0.0, 0.0, 0.0, 0.0];
const iMusicN = [0.0, 0.0, 0.0, 0.0];
const iMusicS = [0.0, 0.0, 0.0, 0.0];

const flickeringThreshold = 0.01;

// SMOOTH, makes latency worst
// const smoothArray = [0.1, 0.1, 0.1, 0.1];
// const adaptArray = [0.5, 0.6, 1, 1];

export default function ListenVisual({ }) {

  const [low, setLow, lowRef] = useState(1)
  const [gHigh, setGHigh, gHighRef] = useState(0)
  const [rHigh, setRHigh, rHighRef] = useState(0)
  const [aHigh, setAHigh, aHighRef] = useState(0)
  const [iHigh, setIHigh, iHighRef] = useState(0)
  const [nHigh, setNHigh, nHighRef] = useState(0)
  const [sHigh, setSHigh, sHighRef] = useState(0)

  const [sensitivity, setSensitivity] = useState(5);

  // SET INTERVAL
  const run = () => {
    now = window.performance.now();
    const delta = now - then;
    if (delta > interval) {
      then = now - (delta % interval);
      const t = now / 1000;
      render(t);
    }
    rafID = window.requestAnimationFrame(run);
  };

  const avoidFlickering = (currentValue, newValue) => {
    const difference = currentValue - newValue;
    return (difference > flickeringThreshold || difference < -flickeringThreshold)
  }

  // ANALYSE + UPDATE FREQUENCIES
  const render = (time) => {
    if (clubber) {
      // copy current frequency dta from analyser to frequencyData array
      // values are in dB units 0..255
      // https://webaudio.github.io/web-audio-api/#dom-analysernode-getbytefrequencydata
      // https://stackoverflow.com/questions/14789283/what-does-the-fft-data-in-the-web-audio-api-correspond-to

      // db = energia su unita di tempo
      // 10.log( p/p0)^2
      analyser.getByteFrequencyData(frequencyData);
      clubber.update(null, frequencyData, false);
      
      bands.low(iMusicLow);
      if(avoidFlickering(iMusicLow[3], lowRef.current)) setLow(iMusicLow[3])

      bands.g(iMusicG);
      if(avoidFlickering(iMusicG[3], gHighRef.current)) setGHigh(iMusicG[3])
      bands.r(iMusicR);
      if(avoidFlickering(iMusicR[3], rHighRef.current)) setRHigh(iMusicR[3])
      bands.a(iMusicA);
      if(avoidFlickering(iMusicA[3], aHighRef.current)) setAHigh(iMusicA[3])
      bands.i(iMusicI);
      if(avoidFlickering(iMusicI[3], iHighRef.current)) setIHigh(iMusicI[3])
      bands.n(iMusicN);
      if(avoidFlickering(iMusicN[3], nHighRef.current)) setNHigh(iMusicN[3])
      bands.s(iMusicS);
      if(avoidFlickering(iMusicS[3], sHighRef.current)) setSHigh(iMusicS[3])
    }
    rafID = window.requestAnimationFrame(run);
    tmp = fb1;
    fb1 = fb2;
    fb2 = tmp;
  };

  // CONNECT TRACK
  const init = () => {
    navigator.getUserMedia = navigator.getUserMedia
      || navigator.webkitGetUserMedia
      || navigator.mozGetUserMedia;
    navigator.getUserMedia({ video: false, audio: true }, callback, console.log);
  }

  // CREATE ANALYSER
  const callback = (stream) => {
    audioContext = new AudioContext({
      latencyHint: 0,
    });
    mic = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = fftSize;
    numPoints = analyser.frequencyBinCount;
    frequencyData = new Uint8Array(numPoints);
    try {
      mic.connect(analyser);

      analyser.connect(audioContext.destination);
      clubber = new Clubber({
        context: audioContext,
        analyser: analyser,
        size: fftSize,
        mute: true,
        latency: 0
      });
      bands = {

        low: clubber.band({
          template: "0123",
          from: 1,
          to: 40,
        }),

        g: clubber.band({
          template: "0123",
          from: 40,
          to: 60,
        }),

        r: clubber.band({
          template: "0123",
          from: 55,
          to: 75,
        }),

        a: clubber.band({
          template: "0123",
          from: 71,
          to: 91,
        }),

        i: clubber.band({
          template: "0123",
          from: 86,
          to: 106,
        }),

        n: clubber.band({
          template: "0123",
          from: 102,
          to: 122,
        }),

        s: clubber.band({
          template: "0123",
          from: 117,
          to: 127,
        }),

        
      };
    } catch (err) {
      console.error(err);
    }

    then = window.performance.now();
    run();
  };

  // INIT
  useEffect(() => {
    init()
  }, []);


  const [variation, setVariation, variationRef] = useState(0);
  let variationInterval = useRef(null)

  const [indexGN, setIndexGN, indexGNRef] = useState(0);
  let gNIntervalShift = useRef(null)
  let gNInterval = useRef(null)

  const [indexRI, setIndexRI, indexRIRef] = useState(0);
  let rIIntervalShift = useRef(null)
  let rIInterval = useRef(null)

  const [indexAS, setIndexAS, indexASRef] = useState(0);
  let aSIntervalShift = useRef(null)
  let aSInterval = useRef(null)

  const positiveValues = {
    'gn': true,
    'ri': true,
    'as': true,
    'variation': true
  }

  // SHIFT FN
  const startVariation = (interval, duration, positiveIndex, setIndexFn, valueToAdd, index) => {
    if(interval.current) clearInterval(interval.current)
    if(index.current >= 1) positiveValues[positiveIndex] = false;
    if(index.current <= 0) positiveValues[positiveIndex] = true;
    interval.current = setInterval(() => {
      setIndexFn(index.current + (positiveValues[positiveIndex] ? valueToAdd : -valueToAdd))
      if(index.current >= 1) clearInterval(interval.current)
      if(index.current <= 0) clearInterval(interval.current)
    }, duration)
  }

  // LETTER TIMINGS
  const createLetterShifting = (interval, intervalShift, duration, positiveIndex, setIndexFn, valueToAdd, index, globalTimingStart, globalTimingEnd) => {
    setTimeout(() => {
      startVariation(intervalShift, duration, positiveIndex, setIndexFn, valueToAdd, index)
    }, globalTimingStart)
    interval.current = setInterval(() => {
      setTimeout(() => {
        startVariation(intervalShift, duration, positiveIndex, setIndexFn, valueToAdd, index)
      }, globalTimingStart)
    }, globalTimingEnd)
  }

   // LETTER SHIFTING INIT
   useEffect(() => {
    // G + N, exchange every 30 seconds, with a 10 second shift
    createLetterShifting(gNInterval, gNIntervalShift, 100, 'gn', setIndexGN, 0.01, indexGNRef, 25000, 35000)
    // R + I, exchange every 45 seconds, with a 5 second shift
    createLetterShifting(rIInterval, rIIntervalShift, 50, 'ri', setIndexRI, 0.01, indexRIRef, 40000, 45000)
    // A + S, exchange every 60 seconds, with a 2.5 second shift
    createLetterShifting(aSInterval, aSIntervalShift, 50, 'as', setIndexAS, 0.02, indexASRef, 50000, 60000)
    // VARIATION AXIS
    startVariation(variationInterval, 100, 'variation', setVariation, 1, variationRef)
    return () => { 
      if(gNInterval.current) clearInterval(gNInterval.current) 
      if(rIInterval.current) clearInterval(rIInterval.current) 
      if(aSInterval.current) clearInterval(aSInterval.current) 
      if(variationInterval.current) clearInterval(variationInterval.current) 
    }
  }, [])


  return (
    <div onClick={init}>
      <div className="logo">
        <Letter 
          letter="g"
          base={20 * sensitivity * low}
          height={(indexGN * gHigh + (1 - indexGN) * nHigh) * 30 * sensitivity}
          variation={variation}
        />
         <Letter 
          letter="r"
          base={20 * sensitivity * low}
          height={(indexRI * rHigh + (1 - indexRI) * iHigh) * 30 * sensitivity}
          variation={variation}
        />
         <Letter 
          letter="a"
          base={20 * sensitivity * low}
          height={(indexAS * aHigh + (1 - indexAS) * sHigh) * 30 * sensitivity}
          variation={variation}
        />
         <Letter 
          letter="i"
          base={20 * sensitivity * low}
          height={(indexRI * iHigh + (1 - indexRI) * rHigh) * 30 * sensitivity}
          variation={variation}
        />
         <Letter 
          letter="."
          base={20 * sensitivity * low}
          height={sHigh * 30 * sensitivity}
          variation={variation}
        />
         <Letter 
          letter="n"
          base={20 * sensitivity * low}
          height={(indexGN * nHigh + (1 - indexGN) * gHigh) * 30 * sensitivity}
          variation={variation}
        />
         <Letter 
          letter="s"
          base={20 * sensitivity * low}
          height={(indexAS * sHigh + (1 - indexAS) * aHigh) * 30 * sensitivity}
          variation={variation}
        />
      </div>

      <footer>
        <label htmlFor="sensitivity">Sensitivity</label>
        <input type="range" value={sensitivity} id="sensitivity" name="sensitivity" min="1" max="10" onChange={(event) => setSensitivity(event.target.value)}/>
      </footer>
    </div>
  );
}
