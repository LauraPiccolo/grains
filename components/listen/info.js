export default function Info ({ mid, high, low, vol }) {
    
    const roundVal = (val) => {
        return Math.round(val*1000)/1000
    }

    return (
        <div className="info-box">
        LOW: {roundVal(low)}
        <br/> MID: {roundVal(mid)}
        <br /> HIGH: {roundVal(high)}
        <br /> VOL: {roundVal(vol)}
      </div>
    )
}