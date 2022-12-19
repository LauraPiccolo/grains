import React, { useEffect, useState } from "react";

export default function Cursor({ text, parent }) {

    const [coord, setCoord] = useState({x: -100, y: -100});
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        parent.current.addEventListener('mousemove', updateCoord);
        parent.current.addEventListener('mouseenter', updateCoord);
        parent.current.addEventListener('mouseleave', removeCursor);
        parent.current.addEventListener('mouseleave', removeCursor);
    }, [])

    const updateCoord = (event) => {
        setCoord({x: event.clientX, y: event.clientY});
        setOpacity(1)
    }

    const removeCursor = () => {
        setOpacity(0)
    }

  return (
    <div className="cursor" style={{left: coord.x, top: coord.y, opacity: opacity}}>
      {(text === 'Fullscreen' || text === 'View tracks') && <span className="cursor__fullscreen" /> }
      <p>{text}</p>
    </div>
  );
}
