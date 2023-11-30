export default function Info({ factorsIndex, letters, minFrequency, maxFrequency, sensitivity, setSensitivity, allFactors, highTransition, setBackgroundColor, setTextColor, textColor, backgroundColor, live, baseValue, highValues, lettersOrder, lettersHigh, variation}) {

    return (
        <header>
            <div>
                <h2>INFORMATION</h2>
                <h3>Letter shifting</h3>
                <ul>
                {factorsIndex.length > 0 &&
                    factorsIndex.map((fac, index) => (
                        <li>Connection between [ {letters[index]} and {letters[fac.linkedTo]} 9] (factor {fac.factor} — {Math.round(allFactors[fac.factor] * 100) / 100})</li>
                    ))
                }
                </ul>
                <h3>Frequencies</h3>
                <ul>
                    <li>base  — {Math.trunc(baseValue * 50 * sensitivity)}</li>
                    {
                        lettersHigh.length > 1 && letters.map((letter, index) => {
                            let i = lettersOrder[index]
                            return (
                            <li>{letter.toUpperCase()}  = {i +1}, frequencies [ {lettersHigh[i+1].min*3} — {(lettersHigh[i+1].min + lettersHigh[i+1].length)*3} ]: {Math.trunc(highValues[i] * 10 * sensitivity)}</li>
                            )
                        })
                    }
                    <li>variation  — {variation}</li>
                </ul>
                <h3>Boundaries</h3>
                <p>OLD: min: {minFrequency} / max: {maxFrequency}</p>
                <p>NEW: min: {minFrequency} / max: {maxFrequency}</p>
                <p>{highTransition && " — Recalculating boundaries"}.</p>
            </div>
            <br />
            <hr/>
            <br />
            <div className="console__sensitivity">
                <h2>SENSITIVITY</h2>
                <input type="range" value={sensitivity} id="sensitivity" name="sensitivity" min="1" max="10" onChange={(event) => setSensitivity(event.target.value)} />
                <br />
                <br />
                <p>Current sensitivity; {sensitivity}</p>
            </div>
            <br />
            <hr/>
            <br />
            <div className="console__colors">
                <h2>COLORS</h2>
                <h3>Background Color</h3>
                <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
                <h3>Text Color</h3>
                <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
            </div>
            <br />
            <hr/>
            <div className="console__mode">
                <h2>CURRENTLY IN {live ? "LIVE":"TRACKS"} MODE</h2>
            </div>
        </header>
    )
}