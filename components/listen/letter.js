import { useEffect, useRef, useState } from "react";

export default function Letter({ letter, base, height, variation }) {

    const limitVal = (val) => {
        return Math.round(val > 100 ? 100 : val);
    }

    return (
        <span
            className="logo__letter"
            style={{
                fontVariationSettings: `
                "BASE" ${limitVal(base)},
                "HGHT" ${limitVal(height)}, 
                "VRTN" ${variation}
              `}}
        >
            {letter}
        </span>
    )
}