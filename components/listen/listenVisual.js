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
let fps = 15;
let interval = 1000 / fps;
let fftSize = 128;
let clubber;
let bands = {};
let bandList = []

const allIMusic = [];
const flickeringThreshold = 0.01;
const limits = [0.0, 0.0, 0.0];

export default function ListenVisual({ }) {

  const [low, setLow, lowRef] = useState(1)
  const [allHighs, setAllHighs, allHighsRef] = useState([]);
  const [lettersHigh, setLettersHigh, lettersHighRef] = useState([])
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  const [sensitivity, setSensitivity] = useState(5);
  const frequencyRange = 5;
  const frequencyLength = Math.trunc(127 / frequencyRange)
  const totalRangeAmount = 8;

  const [minFrequency, setMinFrequency, minFrequencyRef] = useState(0)
  const [maxFrequency, setMaxFrequency, maxFrequencyRef] = useState(frequencyLength)

  // SET DEFAULT VALUES FOR ALL STATES, MAPPED ON LETTERS AND PRECISION
  useEffect(() => {
    let newAllHighs = []
    let newLettersHigh = []
    for (let i = 0; i < frequencyLength; i++) {
      bandList[i] = {
        key: alphabet[i],
        content: {
          template: "0123",
          from: i * frequencyRange + 1,
          to: (i + 1) * frequencyRange + 1,
        }
      }

      allIMusic[i] = [0.0, 0.0, 0.0, 0.0];
      newAllHighs[i] = 0;
      newLettersHigh[i] = {
        min: 0, length: 2
      };
    }
    setAllHighs(newAllHighs)
    setLettersHigh(newLettersHigh)
  }, [])

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

      let minFrequencyLocal = 0;
      let maxFrequencyLocal = 0;

      for (let i = 0; i < frequencyLength; i++) {
        bands[alphabet[i]](allIMusic[i])
        if (avoidFlickering(allIMusic[i][3], allHighsRef.current[i])) {
          setAllHighs((allHighs) => allHighs.map((item, index) => (
            index === i ? allIMusic[i][3] : item
          )
          ))
        }
        if (allIMusic[i][3] > 0.01) {
          if (minFrequencyLocal === 0) {
            minFrequencyLocal = i;
          }
          else maxFrequencyLocal = i;
        }
      }

      if(minFrequencyRef.current > minFrequencyLocal && minFrequencyLocal !== 0) {
        console.log('changing low frequency to: '+minFrequencyLocal)
        setMinFrequency(minFrequencyLocal)
      }
      if(maxFrequencyRef.current < maxFrequencyLocal) {
        console.log('changing high frequency to: '+maxFrequencyLocal)
        setMaxFrequency(maxFrequencyLocal);
      }
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

      bands.total = clubber.band({
        template: "769",
        from: 0,
        to: 127,
        low: 1, // Low velocity/power threshold
        high: 128, // High velocity/power threshold
      })

      bandList.map((freq, index) => {
        bands[freq.key] = clubber.band(freq.content)
      })



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
    if (interval.current) clearInterval(interval.current)
    if (index.current >= 1) positiveValues[positiveIndex] = false;
    if (index.current <= 0) positiveValues[positiveIndex] = true;
    interval.current = setInterval(() => {
      setIndexFn(index.current + (positiveValues[positiveIndex] ? valueToAdd : -valueToAdd))
      if (index.current >= 1) clearInterval(interval.current)
      if (index.current <= 0) clearInterval(interval.current)
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
      if (gNInterval.current) clearInterval(gNInterval.current)
      if (rIInterval.current) clearInterval(rIInterval.current)
      if (aSInterval.current) clearInterval(aSInterval.current)
      if (variationInterval.current) clearInterval(variationInterval.current)
    }
  }, [])

  const adaptativeInterval = useRef()

  const adaptBoundaries = () => {
    console.log('Adapting boundaries')
    console.log('MAX: ' + maxFrequencyRef.current + ' MIN: ' + minFrequencyRef.current)

    const totalRange = maxFrequencyRef.current - minFrequencyRef.current;
    const totalRangeItem = Math.round(totalRange / totalRangeAmount);
    const newHighs = []

    for (let i = 0; i < totalRangeAmount; i++) {
      newHighs[i] = {
        min: i + minFrequencyRef.current,
        length: totalRangeItem
      }
    }

    console.log(newHighs);
    setLettersHigh(newHighs)

    setMinFrequency(25)
    setMaxFrequency(0)
  }

  // REDISTRIBUTE FREQUENCIES
  useEffect(() => {

    adaptBoundaries()

    if (adaptativeInterval.current) clearInterval(adaptativeInterval.current)
    adaptativeInterval.current = setInterval(() => {
        adaptBoundaries()
    }, 30000)
    // Example 1: min frequency is 24, max is 92
  }, [])

  const letters = ['g', 'r', 'a', 'i', '.', 'n', 's'];

  const returnSum = (letterHigh) => {
    return allHighsRef.current.slice(letterHigh.min, letterHigh.min + letterHigh.length).reduce((acc, curr, i) => acc = acc + curr, 0)
  }

  return (
    <div onClick={init}>
      <div className="logo">
        {
          lettersHigh.length > 0 && letters.map((letter, index) => {
            let shiftingIndex = (letter === 'g' || letter === 'n') ? indexGN : (letter === 'a' || letter === 's') ? indexAS : indexRI;
            return (
              <Letter
                letter={letter}
                base={20 * sensitivity * returnSum(lettersHigh[0])}
                height={(shiftingIndex * returnSum(lettersHigh[index + 1]) + (1 - shiftingIndex) * returnSum(lettersHigh[index + 1 % letters.length])) * 10 * sensitivity}
                // height={10}
                variation={variation}
              />
            )
          })
        }
      </div>

      <footer>
        <label htmlFor="sensitivity">Sensitivity</label>
        <input type="range" value={sensitivity} id="sensitivity" name="sensitivity" min="1" max="10" onChange={(event) => setSensitivity(event.target.value)} />
      </footer>
    </div>
  );
}
