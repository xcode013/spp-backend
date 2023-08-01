import React, { useEffect, useState } from 'react'
import "./button.css"

function Button({content, color, size, actionOnClick}) {
  const [clr, setClr] = useState("standar");
  const [sz, setSz] = useState("normal");

  useEffect(()=> {
    setClr(color);
    setSz(size);
  }, [color, size]);

  return (
    <button onClick={actionOnClick} className={`button-component ${sz} ${clr}`}>
        {content}
    </button>
  )
}

export default Button