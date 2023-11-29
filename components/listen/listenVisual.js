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
let fps = 12;
let interval = 1000 / fps;
let fftSize = 128;
let clubber;
let bands = {};
let bandList = []

const allIMusic = [];
const flickeringThreshold = 0.005;

export default function ListenVisual({ }) {

  const [allHighs, setAllHighs, allHighsRef] = useState([]);
  const [lettersHigh, setLettersHigh, lettersHighRef] = useState([])
  const [lettersOldHigh, setLettersOldHigh, lettersOldHighRef] = useState([])
  const [highTransition, setHighTransition, highTransitionRef] = useState(false)
  const [highTransitionIndex, setHighTransitionIndex, highTransitionIndexRef] = useState(0)

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  const [sensitivity, setSensitivity] = useState(5);
  const frequencyRange = 3;
  const frequencyLength = Math.trunc(127 / frequencyRange)
  const totalRangeAmount = 7;

  const [minFrequency, setMinFrequency, minFrequencyRef] = useState(0)
  const [maxFrequency, setMaxFrequency, maxFrequencyRef] = useState(frequencyLength)

  // SET DEFAULT VALUES FOR ALL STATES, MAPPED ON LETTERS AND PRECISION
  useEffect(() => {
    // console.log('Initial use effect')
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
        min: 0, length: frequencyRange / totalRangeAmount
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
      // console.log('run')
      then = now - (delta % interval);
      const t = now / 1000;
      render(t);
    }
    rafID = window.requestAnimationFrame(run);
  };

  const avoidFlickering = (currentValue, newValue) => {
    // console.log('avoid flickering')
    const difference = currentValue - newValue;
    return (difference > flickeringThreshold || difference < -flickeringThreshold)
  }

  const frequencyBoundariesThreshold = 2;
  // const frequencyBoundariesThreshold = Math.round((127 / frequencyRange) / 20);

  const [silenceStarted, setSilenceStarted, silenceStartedRef] = useState(true)
  const silenceTimeOut = useRef(null)
  const silenceTimeOut2 = useRef(null)

  // DETECT SILENCES TO ADAPT BOUNDARIES WHEN CHANGING TRACK
  const checkIfSilence = (arrayIValues) => {
    // console.log('check if silence')
    let isSilence = true;

    // Check all frequencies
    for(let i = 0; i < arrayIValues.length; i++) {
      if(arrayIValues[i][3] > 0.1) {
        isSilence = false
      }
    }

    // If all frequencies are silent
    if(isSilence) {
      if(silenceTimeOut.current) clearTimeout(silenceTimeOut.current);
      if(silenceTimeOut2.current) clearTimeout(silenceTimeOut2.current);

      // If this is the first time silence is detected, start the silence timeout
      if(silenceStartedRef.current === false) {
        // console.log('silence started')
        // Silence has to be there for more than 1.5 second
        silenceTimeOut2.current = setTimeout(() => setSilenceStarted(true), 1500);
      }
    }
    else {
      // If sound is detected and silence was true until now
      if(silenceStartedRef.current === true) {
        setSilenceStarted(false)
        // Call adapt boundaries twice, after 8 seconds and after 30 seconds
        silenceTimeOut.current = setTimeout(() => adaptBoundaries(), 8000)
        silenceTimeOut.current = setTimeout(() => adaptBoundaries(), 30000)
      }
    }
    
  }

  // ANALYSE + UPDATE FREQUENCIES
  const render = (time) => {
    // console.log('Render')
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
        // console.log(allIMusic[i][3], i)
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
        // setMinFrequency(minFrequencyLocal - frequencyBoundariesThreshold < 0 ? 0 : minFrequencyLocal - frequencyBoundariesThreshold)
        setMinFrequency(minFrequencyLocal)
      }
      if(maxFrequencyRef.current < maxFrequencyLocal) {
        console.log('changing high frequency to: '+maxFrequencyLocal)
        // setMaxFrequency(maxFrequencyLocal)
        setMaxFrequency(maxFrequencyLocal + frequencyBoundariesThreshold > Math.trunc(127 / frequencyRange) ? Math.trunc(127 / frequencyRange) : maxFrequencyLocal + frequencyBoundariesThreshold);
      }

      checkIfSilence(allIMusic)
    }
    rafID = window.requestAnimationFrame(run);
    tmp = fb1;
    fb1 = fb2;
    fb2 = tmp;
  };

  // CONNECT TRACK
  const init = () => {
    // console.log('Init')
    // console.log(navigator.mediaDevices.getUserMedia)
    // let navigatorFn = navigator.getUserMedia
    //   || navigator.webkitGetUserMedia
    //   || navigator.mozGetUserMedia;
    // navigatorFn({ video: false, audio: true }, callback, console.log);
    navigator.mediaDevices.getUserMedia({ video: false, audio: true })
    .then((stream) => callback(stream))
    .catch((err) => console.log(err));
  }

  // CREATE ANALYSER
  const callback = (stream) => {
    // console.log('Initial call back')
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
  // useEffect(() => {
  //   init()
  // }, []);

  const [allFactors, setAllFactors, allFactorsRef] = useState([0,0,0,0])
  const allIntervalShifts = useRef([])
  const allIntervals = useRef([])
  const positiveValues = [true, true, true, true];

  // SHIFT FN
  const startVariation = (interval, duration, index, valueToAdd) => {
    // console.log('Initial start variation')
    const maxValue = index === 3 ? 100:1;
    if (interval.current[index]) clearInterval(interval.current[index])
    if (allFactorsRef.current[index] >= maxValue) positiveValues[index] = false;
    if (allFactorsRef.current[index] <= 0) positiveValues[index] = true;
    interval.current[index] = setInterval(() => {
      let newAllFactors = allFactorsRef.current;
      const newValue = allFactorsRef.current[index] + (positiveValues[index] ? valueToAdd : -valueToAdd)
      newAllFactors[index] = newValue < 0 ? 0 : newValue > maxValue ? maxValue : newValue;
      setAllFactors(newAllFactors)
      if (allFactorsRef.current[index] >= maxValue) clearInterval(interval.current[index])
      if (allFactorsRef.current[index] <= 0) clearInterval(interval.current[index])
    }, duration)
  }

  const durationList = [100, 50, 50, 100];
  const timingStartList = [25000, 40000, 50000, 10000];
  const valuesToAdd = [0.01, 0.01, 0.02, 1];

  // LETTER TIMINGS
  const createLetterShifting = (index) => {
    // console.log('Create letter shifting')
    setTimeout(() => {
      startVariation(allIntervalShifts, durationList[index], index, valuesToAdd[index])
    }, timingStartList[index])
    allIntervals.current[index] = setInterval(() => {
      setTimeout(() => {
        startVariation(allIntervalShifts, durationList[index], index, valuesToAdd[index])
      }, timingStartList[index])
    }, (timingStartList[index] + durationList[index]*100))
  }

  // LETTER SHIFTING INIT
  useEffect(() => {
    // console.log('Initial letter shifting')
    createLetterShifting(0)
    createLetterShifting(1)
    createLetterShifting(2)
    createLetterShifting(3)

    return () => {
      for(let i = 0; i < allIntervals.current.length; i++) {
        clearInterval(allIntervals.current[i])
      }
    }
  }, [])

  const adaptativeInterval = useRef()
  const highIntervalRef = useRef()

  const adaptBoundaries = (first=false) => {
    console.log('Adapting boundaries')
    console.log('MAX: ' + maxFrequencyRef.current + ' MIN: ' + minFrequencyRef.current)

    const totalRange = maxFrequencyRef.current - minFrequencyRef.current;
    const totalRangeItem = Math.round(totalRange / totalRangeAmount);
    const newHighs = []

    const unusedFrequencies = Math.trunc(127 / frequencyRange) - maxFrequencyRef.current

    for (let i = 0; i < totalRangeAmount; i++) {
      newHighs[i] = {
        min: i === 0 ? 0 : (i*totalRangeItem) + minFrequencyRef.current,
        length: i === 0 ? totalRangeItem + minFrequencyRef.current : i === totalRangeAmount - 1 ? totalRangeItem + unusedFrequencies : totalRangeItem,
        totalRangeItem: totalRangeItem
      }
    }

    setLettersHigh(newHighs)

    // If this if triggered onload
    if(first) setLettersOldHigh(newHighs)

    // If this is a readaptation
    else {
      // Make a transition between old and new
      if(highIntervalRef.current) clearInterval(highIntervalRef.current)
      setHighTransition(true)
      setHighTransitionIndex(1)
  
      setTimeout(() => {
        setHighTransition(false)
        setLettersOldHigh(newHighs)
      }, 5000)
      highIntervalRef.current = setInterval(() => setHighTransitionIndex((highTransitionIndex) => highTransitionIndex - 0.02), 100)
    }

    setMinFrequency(Math.trunc(127 / frequencyRange))
    setMaxFrequency(0)
  }

  // REDISTRIBUTE FREQUENCIES
  useEffect(() => {
    // console.log('Initial use effect rediscribute frequencies')
    adaptBoundaries(true)
    if (adaptativeInterval.current) clearInterval(adaptativeInterval.current)

    // UNCOMMENT THIS FOR LIVE
    // adaptativeInterval.current = setInterval(() => {
    //     adaptBoundaries()
    // }, 60000)

  }, [])

  const letters = ['g', 'r', 'a', 'i', 'n', 's'];

  const returnSum = (letterHigh, letterOldHigh) => {
    // console.log('return sum')
    let newValue;

    // Transition between old value and new value
    if(highTransitionRef.current === true) {
      newValue = ((1 - highTransitionIndexRef.current) * (allHighsRef.current.slice(letterHigh.min, letterHigh.min + letterHigh.length).reduce((acc, curr, i) => acc = acc + curr, 0) / letterHigh.totalRangeItem)) + (highTransitionIndexRef.current * (allHighsRef.current.slice(letterOldHigh.min, letterOldHigh.min + letterOldHigh.length).reduce((acc, curr, i) => acc = acc + curr, 0) / letterOldHigh.totalRangeItem))
    }

    // New value only
    else {
      newValue = allHighsRef.current.slice(letterHigh.min, letterHigh.min + letterHigh.length).reduce((acc, curr, i) => acc = acc + curr, 0) / letterHigh.totalRangeItem
    }

    return newValue;
  }

  const shuffle = (array, setState) => {
    // console.log('schuffle')
    let newArray = array;
    let currentIndex = array.length;
    let randomIndex;
  
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
    }
    setState(newArray)
  }

  const factorShuffle = () => {
    // console.log('Factor Shuffle')
    let allIndexes = [0,1,2,3,4,5]
    const threeFactors = [];
    let newFactorsIndex = [];

    for(let i = 0; i < 3; i++) {
      let randomIndex1 = Math.floor(Math.random() * (allIndexes.length));
      let randomIndex2 = randomIndex1;
      while(randomIndex1 === randomIndex2) {
        randomIndex2 = Math.floor(Math.random() * (allIndexes.length));
      }
      threeFactors[i] = [allIndexes[randomIndex1], allIndexes[randomIndex2]]
      allIndexes.splice(randomIndex1, 1);
      allIndexes.splice((randomIndex1 < randomIndex2 ? randomIndex2 - 1 : randomIndex2), 1);
    }

    for(let i = 0; i < 3; i++) {
        newFactorsIndex[threeFactors[i][0]] = { factor: i, linkedTo: threeFactors[i][1] }
        newFactorsIndex[threeFactors[i][1]] = { factor: i, linkedTo: threeFactors[i][0] }
    }
    setFactorsIndex(newFactorsIndex)
  }

  const [lettersOrder, setLettersOrder] = useState([0,1,2,3,4,5])
  const [factorsIndex, setFactorsIndex] = useState([])

  // Shuffle letters & factors
  useEffect(() => {
    // console.log('Initial use effect Shuffle letters & factors')
    factorShuffle()
    shuffle(lettersOrder, setLettersOrder)
  }, [])
  
  return (
    <div onClick={init}>
      {/* <header>
        INFORMATIONS:
        <div>
          { factorsIndex.length > 0 &&
            factorsIndex.map((fac, index) => (
              <p>letter {letters[index]} is linked to letter {letters[fac.linkedTo]} — They are mapped on factor {fac.factor}, which is currently {Math.round(allFactors[fac.factor] * 100)/100}</p>
            ))
          }
          <br/>
          {factorsIndex.length > 0 && lettersHigh.length > 0 && <p>BASE: {50 * sensitivity * returnSum(lettersHigh[0], lettersOldHigh[0])}</p>}
          <br/>
          <p>MIN: {minFrequency} / MAX: {maxFrequency} {highTransition && " — Recalculating boundaries"}</p>
        </div>
      </header> */}
      <div className="logo">
        {
          (factorsIndex.length > 0 && lettersHigh.length > 0 && lettersOldHigh.length > 0) && letters.map((letter, indexx) => {
            const index = lettersOrder[indexx]

            return (
              <> 
              <Letter
                letter={letter}
                factor={index}
                base={50 * sensitivity * returnSum(lettersHigh[0], lettersOldHigh[0])}
                height={(allFactors[factorsIndex[index].factor] * returnSum(lettersHigh[index + 1], lettersOldHigh[index + 1]) + (1 - allFactors[factorsIndex[index].factor]) * returnSum(lettersHigh[factorsIndex[index].linkedTo + 1], lettersOldHigh[factorsIndex[index].linkedTo + 1])) * 50 * sensitivity}
                variation={allFactors[3]}
                // height={1}
              />
              {letter === 'i' && (
                <Letter
                letter={'.'}
                factor={index}
                variation={allFactors[3]}
                height={50 * sensitivity * returnSum(lettersHigh[0], lettersOldHigh[0])}
                base={(allFactors[factorsIndex[index].factor] * returnSum(lettersHigh[index + 1], lettersOldHigh[index + 1]) + (1 - allFactors[factorsIndex[index].factor]) * returnSum(lettersHigh[factorsIndex[index].linkedTo + 1], lettersOldHigh[factorsIndex[index].linkedTo + 1])) * 50 * sensitivity}
              />
              )}
              </>
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
