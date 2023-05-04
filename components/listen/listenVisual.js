import React, { useEffect, useRef, useState } from "react";
import "./glsl/raf.js";
import Clubber from "clubber";
import { AudioContext } from "standardized-audio-context";
import Info from "./info.js";
import Shape from "./shape.js";
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
let fps = 60;
let interval = 1000 / fps;
let clubber;
let bands = {};

const iMusicLow = [0.0, 0.0, 0.0, 0.0];
const iMusicG = [0.0, 0.0, 0.0, 0.0];
const iMusicR = [0.0, 0.0, 0.0, 0.0];
const iMusicA = [0.0, 0.0, 0.0, 0.0];
const iMusicI = [0.0, 0.0, 0.0, 0.0];
const iMusicN = [0.0, 0.0, 0.0, 0.0];
const iMusicS = [0.0, 0.0, 0.0, 0.0];

const smoothArray = [0.1, 0.1, 0.1, 0.1];
const adaptArray = [0.5, 0.6, 1, 1];

export default function ListenVisual({ }) {


  // const [sub, setSub] = useState(1)
  const [low, setLow] = useState(1)
  const [gHigh, setGHigh] = useState(0)
  const [rHigh, setRHigh] = useState(0)
  const [aHigh, setAHigh] = useState(0)
  const [iHigh, setIHigh] = useState(0)
  const [nHigh, setNHigh] = useState(0)
  const [sHigh, setSHigh] = useState(0)
  // const [high, setHigh] = useState(1)
  // const [volume, setVolume] = useState(1)

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
      setLow(iMusicLow[3])

      bands.g(iMusicG);
      setGHigh(iMusicG[3])
      bands.r(iMusicR);
      setRHigh(iMusicR[3])
      bands.a(iMusicA);
      setAHigh(iMusicA[3])
      bands.i(iMusicI);
      setIHigh(iMusicI[3])
      bands.n(iMusicN);
      setNHigh(iMusicN[3])
      bands.s(iMusicS);
      setSHigh(iMusicS[3])
    }
    rafID = window.requestAnimationFrame(run);
    tmp = fb1;
    fb1 = fb2;
    fb2 = tmp;
  };

  const init = () => {
    navigator.getUserMedia = navigator.getUserMedia
      || navigator.webkitGetUserMedia
      || navigator.mozGetUserMedia;
    navigator.getUserMedia({ video: false, audio: true }, callback, console.log);
  }

  const callback = (stream) => {
    audioContext = new AudioContext();
    mic = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    // analyser.fftSize = 2048;
    analyser.fftSize = 128;
    numPoints = analyser.frequencyBinCount;
    frequencyData = new Uint8Array(numPoints);
    try {
      mic.connect(analyser);
      // Unecessary if you want the sound to be muted
      // analyser.connect(audioContext.destination);
      clubber = new Clubber({
        context: audioContext,
        analyser: analyser,
      });
      bands = {

        low: clubber.band({
          template: "0123",
          from: 1,
          to: 40,
          smooth: smoothArray,
          adapt: adaptArray,
        }),

        g: clubber.band({
          template: "0123",
          from: 40,
          to: 65,
          smooth: smoothArray,
          adapt: adaptArray,
        }),
        r: clubber.band({
          template: "0123",
          from: 52,
          to: 77,
          smooth: smoothArray,
          adapt: adaptArray,
        }),

        a: clubber.band({
          template: "0123",
          from: 65,
          to: 90,
          smooth: smoothArray,
          adapt: adaptArray,
        }),

        i: clubber.band({
          template: "0123",
          from: 77,
          to: 102,
          smooth: smoothArray,
          adapt: adaptArray,
        }),

        n: clubber.band({
          template: "0123",
          from: 90,
          to: 115,
          smooth: smoothArray,
          adapt: adaptArray,
        }),

        s: clubber.band({
          template: "0123",
          from: 102,
          to: 127,
          smooth: smoothArray,
          adapt: adaptArray,
        }),

        
      };
    } catch (err) {
      console.error(err);
    }

    then = window.performance.now();
    run();
  };

  useEffect(() => {
    init()
  }, []);

  return (
    <div>
      {/* <Info
        low={low}
        mid={mid}
        high={high}
        vol={volume}
      /> */}

      {/* <div className="shape-wrapper">
        <Shape title="low" scale={low} />
        <Shape title="high" scale={high} />
        <Shape title="mid" scale={mid} />
      </div> 
      */}

      <div className="logo">
        <Letter 
          letter="g"
          base={200 * low}
          height={gHigh * 300}
          variation={1}
        />
         <Letter 
          letter="r"
          base={200 * low}
          height={rHigh * 300}
          variation={1}
        />
         <Letter 
          letter="a"
          base={200 * low}
          height={aHigh * 300}
          variation={1}
        />
         <Letter 
          letter="i"
          base={200 * low}
          height={iHigh * 300}
          variation={1}
        />
         <Letter 
          letter="n"
          base={200 * low}
          height={nHigh * 300}
          variation={1}
        />
         <Letter 
          letter="s"
          base={200 * low}
          height={sHigh * 300}
          variation={1}
        />
      </div>
    </div>
  );
}
