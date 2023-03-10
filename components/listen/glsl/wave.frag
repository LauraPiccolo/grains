// // by Andrea Bovo, spleennooname / 2016
// // Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

// precision mediump highp;

// varying vec2 vUv;

// uniform float iGlobalTime;
// uniform vec2 iResolution;

// uniform vec4 iMusicSub;
// uniform vec4 iMusicLow;
// uniform vec4 iMusicMid;
// uniform vec4 iMusicHigh;

// #define time iGlobalTime
// #define R iResolution.xy

// #define N_WAVES 5
// #define GREY 220./255.

// //noise
// float rand(float n){
//     return fract(sin(n) * 43758.5453123);
// }

// float noise(float p){
//     float fl = floor(p);
//     float fc = fract(p);
//     return mix(rand(fl), rand(fl + 1.0), fc);
// }

// float gauss(float s, float x){
//     return (0.85)*exp(-x*x/(2.*s*s));
// }

// float blur(float dist, float width, float blur, float intens){
//     dist = max( abs(dist)-width, 0.);
//     float b = gauss(0.02 + width *10.*blur, dist);
//     return b*intens;
// }

// float d2y2(float d, float i){
//     float b = 0.75*i+0.0001;
//     return blur(d , 0.005, b, 0.45);
// }

// float f(float x){
//     return blur(0.5*x, 0.03, 0.04+0.5, 1.);
// }

// float wave(float x, int i, vec4 sub, vec4 low, vec4 mid, vec4 high){

// 	//0 the note where the highest energy was seen,
// 	//1 the average note for the whole band,
// 	//2 the octave (bass vs treble) and
// 	//3 the average energy of all triggered notes.

//     float i_f = float(i);

//     float y = ( mix(0., +.75,  high[1]*.75 + high[0] + mid[0]) - .25*i_f )*sin( x*1.45  + .55*time- i_f * mix(-.5, +.5, sub[1] + mid[0] + low[0] + high[3]) );

//     return y;
// }

// void main(void) {

//     vec2 uv = (gl_FragCoord.xy / R.xy - vec2(0.5)) * vec2(R.x / R.y, 1.0);

//     uv.y *= 1.5;
//     uv.x *= 1.75;

//     vec3 col = vec3(0.);

//     for(int i = 0; i<N_WAVES; ++i){

//         float i_f = float(i)*0.5 + 1.;

//         float y = d2y2( distance( 2.*uv.y, wave(uv.x, i, iMusicSub, iMusicLow, iMusicMid, iMusicHigh) ), i_f );
//         col += y;

//     }

//     gl_FragColor = vec4( GREY - col, 1.0);
// }
