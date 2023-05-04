import React, { useEffect, useRef, useState } from "react";
import "./glsl/raf.js";
import Clubber from "clubber";
import { AudioContext } from "standardized-audio-context";

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
let fps = 360;
// let fps = 60;
let interval = 1000 / fps;
let clubber;
let bands = {};
const iMusicSub = [0.0, 0.0, 0.0, 0.0];
const iMusicLow = [0.0, 0.0, 0.0, 0.0];
const iMusicMid = [0.0, 0.0, 0.0, 0.0];
const iMusicHigh = [0.0, 0.0, 0.0, 0.0];
const smoothArray = [0.1, 0.1, 0.1, 0.1];
const adaptArray = [0.5, 0.6, 1, 1];

export default function ListenVisual({ }) {


  const [sub, setSub] = useState(1)
  const [low, setLow] = useState(1)
  const [mid, setMid] = useState(1)
  const [high, setHigh] = useState(1)

  // useEffect(() => {
  //   console.log('LOW : '+low)
  // }, [low])

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
      // bands.sub(iMusicSub);
      bands.high(iMusicHigh);
      bands.mid(iMusicMid);
      // console.log(Math.round(iMusicLow[0]*10)/10 + ' || ' +Math.round(iMusicLow[1]*10)/10  + ' || ' +Math.round(iMusicLow[2]*10)/10  + ' || ' +Math.round(iMusicLow[3]*10)/10)
      setLow(iMusicLow[3])
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
    analyser.fftSize = 2048;
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
          to: 48,
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
      <div className="info-box">
        LOW: {Math.round(low * 1000) / 1000}
        <br/> MID: {Math.round(mid*1000)/1000}
        <br /> HIGH: {Math.round(high * 1000) / 1000}
        <br /> VOL: {Math.round((high + low + sub + mid) * 1000) / 1000}
      </div>

      <div className="low-round"
        style={{ transform: `scale(${low})` }}
      >LOW</div>

      <div className="high-round"
        style={{ transform: `scale(${high})` }}
      >HIGH</div>

      <div className="mid-round"
        style={{ transform: `scale(${mid})` }}
      >MID</div>

      <h1
      style={{
        fontVariationSettings: `
            "RRRR" ${200 * high > 100 ? 100 : 200 * high}, 
            "HHHH" ${low * 300 > 100 ? 100 : low * 300}, 
            "VRTN" ${(high + low + sub + mid)*50 > 1 ? 1 : (high + low + sub + mid)*50}
        `}}
      >grains</h1>

      {/* <h1
      // style={{
      //   fontVariationSettings: `"wght" ${24+(100*low)}, "SPAC" ${spacVal}, "HEIG" ${65+(400*high)}, "ASCE" ${156+(600*mid)}, "DESC" ${456+(500*mid)}, "DIAC" ${(100*high)}, "MONO" ${monoVal}, "CURV" ${(0*sub)}`
      // }} 'height' 50, 'base': 50, 'variation': 50
      >
        <span
          style={{
            fontVariationSettings: `
            "RRRR" ${200 * high > 100 ? 100 : 200 * high}, 
            "HHHH" ${low * 300 > 100 ? 100 : low * 300}, 
            "VRTN" ${(high + low + sub + mid) > 1 ? 1 : (high + low + sub + mid)}
          `}}
        >
          g
        </span>
        <span
          style={{
            fontVariationSettings: `
            "RRRR" ${200 * high > 100 ? 100 : 200 * high}, 
            "HHHH" ${low * 300 > 100 ? 100 : low * 300}, 
            "VRTN" ${(high + low + sub + mid) > 1 ? 1 : (high + low + sub + mid)}
          `}}
        >
          r
        </span>
        <span
           style={{
            fontVariationSettings: `
            "RRRR" ${200 * high > 100 ? 100 : 200 * high}, 
            "HHHH" ${low * 300 > 100 ? 100 : low * 300}, 
            "VRTN" ${(high + low + sub + mid) > 1 ? 1 : (high + low + sub + mid)}
          `}}
        >
          a
        </span>
        <span
          style={{
            fontVariationSettings: `
            "RRRR" ${200 * high > 100 ? 100 : 200 * high}, 
            "HHHH" ${low * 300 > 100 ? 100 : low * 300}, 
            "VRTN" ${(high + low + sub + mid) > 1 ? 1 : (high + low + sub + mid)}
          `}}
        >
          i
        </span>
        <span
           style={{
            fontVariationSettings: `
            "RRRR" ${200 * high > 100 ? 100 : 200 * high}, 
            "HHHH" ${low * 300 > 100 ? 100 : low * 300}, 
            "VRTN" ${(high + low + sub + mid) > 1 ? 1 : (high + low + sub + mid)}
          `}}
        >
          n
        </span>
        <span
           style={{
            fontVariationSettings: `
            "RRRR" ${200 * high > 100 ? 100 : 200 * high}, 
            "HHHH" ${low * 300 > 100 ? 100 : low * 300}, 
            "VRTN" ${(high + low + sub + mid) > 1 ? 1 : (high + low + sub + mid)}
          `}}
        >
          s
        </span>
      </h1> */}
    </div>
  );
}
