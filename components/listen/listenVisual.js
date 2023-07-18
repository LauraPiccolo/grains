import React, { useEffect, useRef } from "react";
import useState from 'react-usestateref';
import "./glsl/raf.js";
import Clubber from "clubber";
import { AudioContext } from "standardized-audio-context";
// import Info from "./info.js";
// import Shape from "./shape.js";
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
let fps = 360;
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

// SMOOTH, makes latency worst
// const smoothArray = [0.1, 0.1, 0.1, 0.1];
// const adaptArray = [0.5, 0.6, 1, 1];

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

  const [sensitivity, setSensitivity] = useState(5)

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
      setLow(iMusicLow[3])
      if(iMusicLow[3] > 0.3) console.log(iMusicLow[3]);

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

  // CONNECT TRACK
  const init = () => {
    // navigator.getUM = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.mediaDevices.getUserMedia;
    
    // audioContext.createMediaElementSource(audioElement);
    // navigator.mediaDevices.getUserMedia({ video: false, audio: {
    //   echoCancellation: false,
    //   noiseSuppression: false,
    //   autoGainControl: false
    // } }).then((stream)=> { callback(stream) })
    // navigator.mediaDevices.getUserMedia({ video: false, audio: true }, callback, console.log);
    callback()
  }

  // CREATE ANALYSER
  const callback = () => {
    const audioElement = document.querySelector("audio");
    audioContext = new AudioContext({
      latencyHint: 0,
    });
    mic = audioContext.createMediaElementSource(audioElement);
    audioElement.play()
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
  let positive = true;
  let variationInterval = useRef(null)

  // VARIATION AXIS
  useEffect(() => {
      if(variationInterval.current) clearInterval(variationInterval.current)
      variationInterval.current = setInterval(() => {
        if(variationRef.current >= 100) positive = false
        if(variationRef.current <= 0) positive = true
        setVariation(variationRef.current + (positive ? 1 : -1))
      }, 100)

      return () => { if(variationInterval.current) clearInterval(variationInterval.current) }
  }, [])

  return (
    <div>
      <audio src="/sound/test.mp3"></audio>
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
          base={20 * sensitivity * low}
          height={aHigh * 30 * sensitivity}
          variation={variation}
        />
         <Letter 
          letter="r"
          base={20 * sensitivity * low}
          height={sHigh * 30 * sensitivity}
          variation={variation}
        />
         <Letter 
          letter="a"
          base={20 * sensitivity * low}
          height={iHigh * 30 * sensitivity}
          variation={variation}
        />
         <Letter 
          letter="i"
          base={20 * sensitivity * low}
          height={gHigh * 30 * sensitivity}
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
          height={rHigh * 30 * sensitivity}
          variation={variation}
        />
         <Letter 
          letter="s"
          base={20 * sensitivity * low}
          height={nHigh * 30 * sensitivity}
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
