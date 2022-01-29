import React, { useState } from "react";

export const Interest = (interestData)=>{
    const [state, setState] = useState('unselected')
    return (
        
        <li key={`interest ${index}`} className={state} onClick={setState('selected')}>
            
            <img src={interestData.imgUrl} alt={`Imagen sobre interés ${interestData.name}`} />
            <h5>{interestData.name}</h5>
        </li>
    )
}