import React, { useEffect, useRef, useState } from "react";
import vs from "./glsl/vert.glsl";
import fs from "./glsl/frag.glsl";
import ps from "./glsl/post.glsl";
import dynamic from 'next/dynamic'
import "./glsl/raf.js";

import Clubber from "clubber";
import { AudioContext } from "standardized-audio-context";
import GPUTools from "./glsl/GPUTools";

import { TweenMax } from "gsap";
import * as twgl from "twgl.js";

  let audio;
  let canvas;
  let gl;
  let positionBuffer;

  let fb1;
  let fb2;
  let tmp;

  let source;
  let gpuTools;
  let pixelRatio = 0;
  let displayWidth;
  let displayHeight;
  let audioContext;
  let analyser;
  let programInfo;
  let postInfo;
  let stats;
  let numPoints;
  let frequencyData;
  let now = 0;
  let then = 0;
  let fps = 60;
  let interval = 1000 / fps;
  let rafID = -1;
  let bufferSize = 512;
  let cover;
  let clubber;
  let bands = {};
  const iMusicSub = [0.0, 0.0, 0.0, 0.0];
  const iMusicLow = [0.0, 0.0, 0.0, 0.0];
  const iMusicMid = [0.0, 0.0, 0.0, 0.0];
  const iMusicHigh = [0.0, 0.0, 0.0, 0.0];
  const smoothArray = [0.1, 0.1, 0.1, 0.1];
  const adaptArray = [0.5, 0.6, 1, 1];


export default function ListenVisual({ track, thisAudio, firstPlay }) {

  let thisWrapper = useRef(null)

  const bigTriangle = {
    data: [-1, -1, -1, 4, 4, -1],
    numComponents: 2,
  };

  const demo = () => {
    // canvas
    canvas = document.querySelector(".audio-player__visual canvas");
    try {
      gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch (err) {
      console.error("no WebGL in da house.");
      return;
    }
    // audio el
    audio = thisAudio.current;
    audio.crossOrigin = "anonymous";
    // audio.loop = true;
    audio.src = track;
    audio.volume = 1;
    //
    canvas.addEventListener(
      "webglcontextlost",
      (event) => {
        console.warn("lost");
        event.preventDefault();
        stop();
      },
      false
    );

    canvas.addEventListener(
      "webglcontextrestored",
      (event) => {
        console.warn("restored");
        demo();
      },
      false
    );

    initGL();
    // gl.getExtension('WEBGL_lose_context').restoreContext();
    // gl.getExtension('WEBGL_lose_context').loseContext();
  };

  const initGL = () => {
    gpuTools = new GPUTools();

    const gpu = gpuTools.getBestGPUSettings();
    bufferSize = gpu.bufferSize;
    fps = 60; // gpu.fps; try max fps
    pixelRatio = gpu.ratio;

    interval = 1000 / fps;

    // stats = new Stats();

    // stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    // document.body.appendChild(stats.domElement);

    gl = twgl.getContext(canvas, { antialiasing: true });

    fb1 = twgl.createFramebufferInfo(gl, null, bufferSize, bufferSize);
    fb2 = twgl.createFramebufferInfo(gl, null, bufferSize, bufferSize);

    programInfo = twgl.createProgramInfo(gl, [vs, fs]);
    postInfo = twgl.createProgramInfo(gl, [vs, ps]);

    positionBuffer = twgl.createBufferInfoFromArrays(gl, {
      position: bigTriangle,
    });
  };

  const run = () => {
    now = window.performance.now();
    const delta = now - then;
    if (delta > interval) {
      then = now - (delta % interval);
      const t = now / 1000;
    //   stats.begin();
      render(t);
    //   stats.end();
    }
    rafID = window.requestAnimationFrame(run);
  };

  const resize = () => {
    // Lookup the size the browser is displaying the canvas in CSS pixels
    // and compute a size needed to make our drawingbuffer match it in
    // device pixels.
    // const aspectRatio = window.innerWidth / window.innerHeight;
    displayWidth = bufferSize; // Math.floor(canvas.clientWidth * pixelRatio);
    displayHeight = bufferSize; // Math.floor(canvas.clientHeight * pixelRatio);
    // Check if the canvas is not the same size.
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      // Make the canvas the same size
      canvas.width = displayHeight;
      canvas.height = displayHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
  };

  const render = (time) => {
    /*   if (audio.readyState !== 4) {
    return;
  } */
    resize();
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
      bands.sub(iMusicSub);
      bands.high(iMusicHigh);
      bands.mid(iMusicMid);
    }
    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, positionBuffer);
    twgl.setUniforms(programInfo, {
      iMusicSub: iMusicSub,
      iMusicLow: iMusicLow,
      iMusicMid: iMusicMid,
      iMusicHigh: iMusicHigh,
      iGlobalTime: time,
      uTexture: fb1.attachments[0], // 1st initially empty
      iResolution: [displayWidth, displayHeight],
    });
    twgl.bindFramebufferInfo(gl, fb2);
    twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLES);
    // draw fb2 in canvas
    gl.useProgram(postInfo.program);
    twgl.setBuffersAndAttributes(gl, postInfo, positionBuffer);
    twgl.setUniforms(postInfo, {
      uTime: time,
      uResolution: [displayWidth, displayHeight],
      uTexture: fb2.attachments[0],
    });
    twgl.bindFramebufferInfo(gl, null);
    twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLES);

    // ping-pong buffers
    tmp = fb1;
    fb1 = fb2;
    fb2 = tmp;
  };

  const stop = () => {
    rafID = window.cancelAnimationFrame(run);
  };

  const start = () => {
    thisWrapper.current.removeEventListener("click", start);
    //
    audioContext = new AudioContext(); // (window.AudioContext || window.webkitAudioContext)()
    //
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    // bins frequency from anal. half fft size 2048 / 2
    numPoints = analyser.frequencyBinCount;
    //
    frequencyData = new Uint8Array(numPoints);
    // 2^8 = 0..255
    // console.log(numPoints, frequencyData);

    if(source === undefined) {
      try {
        // audioContext.close()
        source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        //
        analyser.connect(audioContext.destination);
        //
        clubber = new Clubber({
          context: audioContext,
          analyser: analyser,
        });
        //
        bands = {
          sub: clubber.band({
            template: "0123",
            from: 1,
            to: 32,
            /*  low: 1,
          high: 127, */
            smooth: smoothArray,
            adapt: adaptArray,
          }),

          low: clubber.band({
            template: "0123",
            from: 33,
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
    }

    audio.addEventListener("canplay", (event) => {
      console.log('CAN PLAY')
      // document.querySelector('.log').innerHTML += '<br/>set audiocontext on canplay';
      if(source === undefined) {
        try {
          console.log(audioContext)
          audioContext.close()
          source = audioContext.createMediaElementSource(audio);
          source.connect(analyser);
          //
          analyser.connect(audioContext.destination);
          //
          clubber = new Clubber({
            context: audioContext,
            analyser: analyser,
          });
          //
          bands = {
            sub: clubber.band({
              template: "0123",
              from: 1,
              to: 32,
              /*  low: 1,
            high: 127, */
              smooth: smoothArray,
              adapt: adaptArray,
            }),
  
            low: clubber.band({
              template: "0123",
              from: 33,
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
      }
    });
    audio.addEventListener("error", (err) => console.error(err.toString()));
    audio.play();

    TweenMax.to(audio, 3, { volume: 0.7 });
    then = window.performance.now();
    run();
  };

  useEffect(() => {
    demo();
    return () => {
        stop()
    }
    // console.log(track)
  }, []);

  return (
    <div className="audio-player__visual" onClick={() => {if(firstPlay) start()}} ref={thisWrapper}>
      <canvas id="canvas"></canvas>
      <div className="log"></div>
    </div>
  );
}

// window.addEventListener("load", (event) => demo());
