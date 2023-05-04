export default function Letter({ letter, base, height, variation }) {

    const limitVal = (val) => {
        return Math.round(val > 100 ? 100 : val);
    }

    return (
        <span
            className="logo__letter"
            style={{
                fontVariationSettings: `
                "HGHT" ${limitVal(height)}, 
                "BASE" ${limitVal(base)}
              `}}
        >
            {letter}
        </span>
    )
}