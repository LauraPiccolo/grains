import Link from "next/link"
import { useState } from "react"

export default function Info({ factorsIndex, letters, minFrequency, maxFrequency, sensitivity, setSensitivity, allFactors, highTransition, setBackgroundColor, setTextColor, textColor, backgroundColor, live, baseValue, highValues, lettersOrder, lettersHigh, variation, minOldFrequency, maxOldFrequency }) {

    const [consoleOpen, setConsoleOpen] = useState(false)

    return (
        <header className={consoleOpen ? 'header__open':''}>
            <div className="console__open" onClick={() => setConsoleOpen((consoleOpen) => !consoleOpen)}>
                {consoleOpen ? 'Close' : 'Open'} Console
            </div>
            <div style={{ display: consoleOpen ? 'block' : 'none' }} className="console">
                <h2>INFORMATION</h2>
                <h3>Letter shifting</h3>
                <ul>
                    <ul className="single_factor">
                        {factorsIndex.length > 0 &&
                            factorsIndex.map((fac, index) => {
                                if(fac.factor === 0) return (
                                <li>Connection between [ {letters[index]} and {letters[fac.linkedTo]} ] (factor {fac.factor} — value {Math.round(allFactors[fac.factor] * 100) / 100})</li>
                            )})
                        }
                    </ul>
                    <ul className="single_factor">
                        {factorsIndex.length > 0 &&
                            factorsIndex.map((fac, index) => {
                                if(fac.factor === 1) return (
                                <li>Connection between [ {letters[index]} and {letters[fac.linkedTo]} ] (factor {fac.factor} — value {Math.round(allFactors[fac.factor] * 100) / 100})</li>
                            )})
                        }
                    </ul>
                    <ul className="single_factor">
                        {factorsIndex.length > 0 &&
                            factorsIndex.map((fac, index) => {
                                if(fac.factor === 2) return (
                                <li>Connection between [ {letters[index]} and {letters[fac.linkedTo]} ] (factor {fac.factor} — value {Math.round(allFactors[fac.factor] * 100) / 100})</li>
                            )})
                        }
                    </ul>
                </ul>
                <h3>Frequencies</h3>
                <ul>
                    <li>Base  — {Math.trunc(baseValue * 50 * sensitivity)}</li>
                    <li>Variation  — {variation}</li>
                    <br/>
                    {
                        lettersHigh.length > 1 && letters.map((letter, index) => {
                            let i = lettersOrder[index]
                            return (
                                <li>{letter.toUpperCase()}  = {i + 1}, frequencies [ {lettersHigh[i + 1].min * 3} — {(lettersHigh[i + 1].min + lettersHigh[i + 1].length) * 3} ]: {Math.trunc(highValues[i] * 20 * sensitivity)}</li>
                            )
                        })
                    }
                </ul>
                <h3>Boundaries</h3>
                <p>OLD: min: {minOldFrequency} / max: {maxOldFrequency}
                <br/>NEW: min: {minFrequency} / max: {maxFrequency}</p>
                <p style={{color: 'yellow'}}>{highTransition && "Recalculating boundaries"}.</p>
                <br />
                <hr />
                <br />
                <div className="console__sensitivity">
                    <h2>SENSITIVITY</h2>
                    <input type="range" className="sensitivity" value={sensitivity} id="sensitivity" name="sensitivity" min="1" max="10" onChange={(event) => setSensitivity(event.target.value)} />
                    <br />
                    <br />
                    <p>Current sensitivity: {sensitivity}</p>
                </div>
                <br />
                <hr />
                <br />
                <div className="console__colors">
                    <h2>COLORS</h2>
                    <div className="flex">
                        <h3>Background Color</h3>
                        <input className="color-picker" type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
                    </div>
                    <div className="flex">
                        <h3>Text Color</h3>
                        <input className="color-picker" type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
                    </div>
                </div>
                <br />
                <hr />
                <br />
                <div className="console__mode">
                    <h2>CURRENTLY IN {live ? "LIVE" : "TRACKS"} MODE</h2>
                    <Link href={live ? '/tracks':'/live'}>
                        <button className="mode_switch">
                            Switch to {!live ? "LIVE" : "TRACKS"} Mode
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    )
}