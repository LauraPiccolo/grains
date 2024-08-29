import { use, useEffect, useRef, useState } from "react";

export default function Letter({ letter, base, height, variation, factor, textColor }) {

    const limitVal = (val) => {
        return Math.round(val > 100 ? 100 : val);
    }

    return (
        <>
        <span
            className="logo__letter"
            style={{
                fontVariationSettings: `
                "BASE" ${limitVal(base)},
                "HGHT" ${limitVal(height)}, 
                "VRTN" ${variation}
              `,
            color: textColor}}
        >
            {letter}
            {/* <p>{factor}</p> */}
        </span>
        </>
    )
}