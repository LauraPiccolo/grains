import React, { useEffect, useRef } from "react";
import useState from 'react-usestateref';
import "./glsl/raf.js";
import Clubber from "clubber";
import { AudioContext } from "standardized-audio-context";
import Letter from "./letter.js";
import Info from "./info.js";
import { useRouter } from "next/router";

let rafID;
let mic;
let audioContext;
let analyser;
let numPoints;
let frequencyData;
let now = 0;
let then = 0;
let fftSize = 128;
let clubber;
let bands = {};
let bandList = []

const allIMusic = [];
const flickeringThreshold = 0.005;
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const frequencyRange = 3;
const frequencyLength = Math.trunc(127 / frequencyRange)
const totalRangeAmount = 7;
// const frequencyBoundariesThreshold = Math.round((127 / frequencyRange) / 20);
const frequencyBoundariesThreshold = 1;
const positiveValues = [true, true, true, true];
const durationList = [100, 50, 50, 100];
const timingStartList = [25000, 40000, 50000, 10000];
const valuesToAdd = [0.01, 0.01, 0.02, 1];
const letters = ['g', 'r', 'a', 'i', 'n', 's'];

export default function ListenVisual({ live }) {

  // STATES
  const [allHighs, setAllHighs, allHighsRef] = useState([]);
  const [lettersHigh, setLettersHigh, lettersHighRef] = useState([])
  const [lettersOldHigh, setLettersOldHigh, lettersOldHighRef] = useState([])
  const [highTransition, setHighTransition, highTransitionRef] = useState(false)
  const [highTransitionIndex, setHighTransitionIndex, highTransitionIndexRef] = useState(0);
  const [lettersOrder, setLettersOrder] = useState([0,1,2,3,4,5])
  const [factorsIndex, setFactorsIndex] = useState([])
  const [sensitivity, setSensitivity] = useState(5);
  const [minFrequency, setMinFrequency, minFrequencyRef] = useState(0)
  const [maxFrequency, setMaxFrequency, maxFrequencyRef] = useState(frequencyLength)
  const [minOldFrequency, setMinOldFrequency, minOldFrequencyRef] = useState(0)
  const [maxOldFrequency, setMaxOldFrequency, maxOldFrequencyRef] = useState(frequencyLength)
  const [silenceStarted, setSilenceStarted, silenceStartedRef] = useState(true)
  const [allFactors, setAllFactors, allFactorsRef] = useState([0,0,0,0])
  const [t, setT, tRef] = useState(0)
  const [baseValue, setBaseValue] = useState(0)
  const [highValues, setHighValues] = useState([0,0,0,0,0,0])
  const router = useRouter()
  const [backgroundColor, setBackgroundColor] = useState(router.query.backgroundColor || '#202203')
  const [textColor, setTextColor] = useState(router.query.textColor ||'#ffed00')
  const [consoleOpen, setConsoleOpen] = useState(false)

  // REFS
  const fps = 48;
  // const fps = live ? 48:24;
  let interval = 1000 / fps;
  const silenceTimeOut = useRef(null)
  const silenceTimeOut2 = useRef(null)
  const allIntervalShifts = useRef([])
  const allIntervals = useRef([])
  const adaptativeInterval = useRef()
  const highIntervalRef = useRef()

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
      then = now - (delta % interval);
      setT(now / 1000);
      render(tRef.current);
    }
    rafID = window.requestAnimationFrame(run);
  };

  const avoidFlickering = (currentValue, newValue) => {
    const difference = currentValue - newValue;
    return (difference > flickeringThreshold || difference < -flickeringThreshold)
  }

  // DETECT SILENCES TO ADAPT BOUNDARIES WHEN CHANGING TRACK
  const checkIfSilence = (arrayIValues) => {
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
        // Silence has to be there for more than 1.5 second
        silenceTimeOut2.current = setTimeout(() => setSilenceStarted(true), 1500);
      }
    }
    else {
      // If sound is detected and silence was true until now
      if(silenceStartedRef.current === true) {
        setSilenceStarted(false)
        // Reinitialise default state for begining of track
        // if(!live) {
        //   adaptBoundaries(true)
        // }
        // Call adapt boundaries twice, after 8 seconds and after 30 seconds
        silenceTimeOut.current = setTimeout(() => adaptBoundaries(), 10000)
        silenceTimeOut.current = setTimeout(() => adaptBoundaries(), 30000)
      }
    }
    
  }

  // ANALYSE + UPDATE FREQUENCIES
  const render = () => {
    if (clubber) {
      analyser.getByteFrequencyData(frequencyData);
      clubber.update(null, frequencyData, false);

      let minFrequencyLocal = 0;
      let maxFrequencyLocal = 0;

      let newAllHighs = [...allHighsRef.current];

      for (let i = 0; i < frequencyLength; i++) {
        bands[alphabet[i]](allIMusic[i])

        if (avoidFlickering(allIMusic[i][3], allHighsRef.current[i])) {
          newAllHighs[i] = allIMusic[i][3]
        }
        if (allIMusic[i][3] > 0.01) {
          if (minFrequencyLocal === 0) {
            minFrequencyLocal = i;
          }
          else maxFrequencyLocal = i;
        }
      }

      // Condition avoids changing state for nothing
      if(newAllHighs !== allHighsRef.current) setAllHighs(newAllHighs)

      if(minFrequencyRef.current > minFrequencyLocal && minFrequencyLocal !== 0) {
        // console.log('changing low frequency to: '+minFrequencyLocal)
        setMinFrequency(minFrequencyLocal)
      }
      if(maxFrequencyRef.current < maxFrequencyLocal) {
        // console.log('changing high frequency to: '+maxFrequencyLocal)
        setMaxFrequency(maxFrequencyLocal + frequencyBoundariesThreshold > Math.trunc(127 / frequencyRange) ? Math.trunc(127 / frequencyRange) : maxFrequencyLocal + frequencyBoundariesThreshold);
      }

      checkIfSilence(allIMusic)
    }
  };

  // CONNECT TRACK
  const init = () => {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true })
    .then((stream) => callback(stream))
    .catch((err) => console.log(err));
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

      if(live) analyser.connect(audioContext.destination);
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

  // SHIFT FN
  const startVariation = (interval, duration, index, valueToAdd) => {
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

  // LETTER TIMINGS
  const createLetterShifting = (index) => {
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

  const adaptBoundaries = (first=false) => {
    // console.log('Adapting boundaries')
    // console.log('MAX: ' + maxFrequencyRef.current + ' MIN: ' + minFrequencyRef.current)

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

    setMinOldFrequency(minFrequencyRef.current)
    setMaxOldFrequency(maxFrequencyRef.current)
    setMinFrequency(Math.trunc(127 / frequencyRange))
    setMaxFrequency(0)
  }

  const returnSum = (letterHigh, letterOldHigh, index) => {
    // console.log('calculating HEIGHT'+index)
    let newValue;
    // console.log('3: '+Date.now())

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

  const returnSumBase = (time, index) => {
    let newValue;

    // Transition between old value and new value
    if(highTransitionRef.current === true) {
      newValue = ((1 - highTransitionIndexRef.current) * (allHighsRef.current.slice(lettersHigh[index].min, lettersHigh[index].min + lettersHigh[index].length).reduce((acc, curr, i) => acc = acc + curr, 0) / lettersHigh[index].totalRangeItem)) + (highTransitionIndexRef.current * (allHighsRef.current.slice(lettersOldHigh[index].min, lettersOldHigh[index].min + lettersOldHigh[index].length).reduce((acc, curr, i) => acc = acc + curr, 0) / lettersOldHigh[index].totalRangeItem))
    }

    // New value only
    else {
      newValue = allHighsRef.current.slice(lettersHigh[index].min, lettersHigh[index].min + lettersHigh[index].length).reduce((acc, curr, i) => acc = acc + curr, 0) / lettersHigh[index].totalRangeItem
    }

    return newValue;
  }

  const returnSumHeight = (time, indexx) => {

    const index = lettersOrder[indexx]

    // console.log('calculating Height '+index+' — '+time);
    let newValue = allFactors[factorsIndex[index].factor] * returnSum(lettersHigh[index + 1], lettersOldHigh[index + 1]) + (1 - allFactors[factorsIndex[index].factor]) * returnSum(lettersHigh[factorsIndex[index].linkedTo + 1], lettersOldHigh[factorsIndex[index].linkedTo + 1])

    return newValue;
  }

  const shuffle = (array, setState) => {
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

  // REDISTRIBUTE FREQUENCIES, SHUFFLE, INIT
  useEffect(() => {
    init();

    factorShuffle()
    shuffle(lettersOrder, setLettersOrder)

    adaptBoundaries(true)
    if (adaptativeInterval.current) clearInterval(adaptativeInterval.current)

    // Set interval for live where silence might not be often detected
    if(live) {
      adaptativeInterval.current = setInterval(() => {
        adaptBoundaries()
      }, 60000)
    }

  }, [])

  useEffect(() => {
    if(lettersHigh.length > 1) {
      setBaseValue(returnSumBase(t, 0))
      setHighValues([returnSumHeight(t, 1),returnSumHeight(t, 2),returnSumHeight(t, 3),returnSumHeight(t, 4),returnSumHeight(t, 1),returnSumHeight(t, 5)])
      // console.log('Updating State: '+Date.now())
    }
  }, [t])

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor
  }, [backgroundColor])

  // Add bg & text color to url when changing
  useEffect(() => {
    const currentRoute = router.asPath.split('?')[0];

    router.push({
          pathname: currentRoute,
          query: {textColor: textColor, backgroundColor: backgroundColor}
      },
      undefined, { shallow: true }
    )
  }, [backgroundColor, textColor])

  return (
    <div>
      <Info
      factorsIndex={factorsIndex}
      letters={letters}
      minFrequency={minFrequency}
      maxFrequency={maxFrequency}
      sensitivity={sensitivity}
      setSensitivity={setSensitivity}
      allFactors={allFactors}
      highTransition={highTransition}
      setTextColor={setTextColor}
      textColor={textColor}
      setBackgroundColor={setBackgroundColor}
      backgroundColor={backgroundColor}
      live={live}
      lettersOrder={lettersOrder}
      baseValue={baseValue}
      highValues={highValues}
      lettersHigh={lettersHigh}
      variation={allFactors[3]}
      minOldFrequency={minOldFrequency}
      maxOldFrequency={maxOldFrequency}
      consoleOpen={consoleOpen}
      setConsoleOpen={setConsoleOpen}
      />
      <div className="logo" onClick={() => setConsoleOpen(false)}>
        {
          (factorsIndex.length > 0 && lettersHigh.length > 0 && lettersOldHigh.length > 0) && letters.map((letter, indexx) => {
            const index = lettersOrder[indexx]
            return (
              <> 
              <Letter
                letter={letter}
                factor={index}
                base={50 * sensitivity * baseValue}
                height={highValues[index] * 20 * sensitivity}
                variation={allFactors[3]}
                textColor={textColor}
              />
              {letter === 'i' && (
                <Letter
                letter={'.'}
                factor={index}
                variation={allFactors[3]}
                height={50 * sensitivity * baseValue}
                base={highValues[4] * 20 * sensitivity}
                textColor={textColor}
              />
              )}
              </>
            )
          })
        }
      </div>
    </div>
  );
}
