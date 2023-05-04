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
let fps = 180;
let interval = 1000 / fps;
let clubber;
let bands = {};
const iMusicSub = [0.0, 0.0, 0.0, 0.0];
const iMusicLow = [0.0, 0.0, 0.0, 0.0];
const iMusicVolume = [0.0, 0.0, 0.0, 0.0];
const iMusicMid = [0.0, 0.0, 0.0, 0.0];
const iMusicHigh = [0.0, 0.0, 0.0, 0.0];
const smoothArray = [0.1, 0.1, 0.1, 0.1];
const adaptArray = [0.5, 0.6, 1, 1];

export default function ListenVisual({ }) {


  const [sub, setSub] = useState(1)
  const [low, setLow] = useState(1)
  const [mid, setMid] = useState(1)
  const [high, setHigh] = useState(1)
  const [volume, setVolume] = useState(1)

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
      bands.volume(iMusicVolume);
      // bands.sub(iMusicSub);
      bands.high(iMusicHigh);
      bands.mid(iMusicMid);
      // console.log(Math.round(iMusicLow[0]*10)/10 + ' || ' +Math.round(iMusicLow[1]*10)/10  + ' || ' +Math.round(iMusicLow[2]*10)/10  + ' || ' +Math.round(iMusicLow[3]*10)/10)
      setLow(iMusicLow[3])
      setVolume(iMusicVolume[3])
      // setSub(iMusicSub[3]*10)
      setHigh(iMusicHigh[3])
      setMid(iMusicMid[3])
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
        // sub: clubber.band({
        //   template: "0123",
        //   from: 1,
        //   to: 32,
        //   /*  low: 1,
        // high: 127, */
        //   smooth: smoothArray,
        //   adapt: adaptArray,
        // }),

        low: clubber.band({
          template: "0123",
          from: 1,
          to: 40,
          /* low: 1,
        high:127, */
          smooth: smoothArray,
          adapt: adaptArray,
        }),

        mid: clubber.band({
          template: "0123",
          from: 49,
          to: 64,
          /*  low: 1,
          high: 127, */
          smooth: smoothArray,
          adapt: adaptArray,
        }),

        high: clubber.band({
          template: "0123",
          from: 65,
          to: 127,
          /* low: 1,
        high: 127, */
          smooth: smoothArray,
          adapt: adaptArray,
        }),
        volume: clubber.band({
          template: "0123",
          from: 1,
          to: 127,
          /* low: 1,
        high: 127, */
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
      <Info
        low={low}
        mid={mid}
        high={high}
        vol={volume}
      />

      <div className="shape-wrapper">
        <Shape title="low" scale={low} />
        <Shape title="high" scale={high} />
        {/* <Shape title="mid" scale={mid} /> */}
      </div>

      <div className="logo">
        <Letter 
          letter="g"
          base={200 * low}
          height={high * 120}
          variation={1}
        />
         <Letter 
          letter="r"
          base={250 * low}
          height={high * 140}
          variation={1}
        />
         <Letter 
          letter="a"
          base={300 * low}
          height={high * 160}
          variation={1}
        />
         <Letter 
          letter="i"
          base={250 * low}
          height={high * 180}
          variation={1}
        />
         <Letter 
          letter="n"
          base={200 * low}
          height={high * 200}
          variation={1}
        />
         <Letter 
          letter="s"
          base={150 * low}
          height={high * 220}
          variation={1}
        />
      </div>
    </div>
  );
}
