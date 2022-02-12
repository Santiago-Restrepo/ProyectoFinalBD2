import React from 'react';
import { Link } from 'react-router-dom';

export const Plans = ( {setShowDelete, value} ) =>{

    import('./estilosPlans.sass');
    console.log(value)
    return(
        <div className='Card'>
            <p>{value.asignatura}</p>
            <p>{value.docente}</p>
            <p>{value.semestre} - {value.periodo}</p>
            <div className='ContentButtons'>
                <button><Link to={`/viewPlan/${value._id}`}>Ver plan</Link></button>
                <div className='ButtonDelete'>
                    <button onClick={()=> setShowDelete({
                        show: true,
                        datos: value
                    })}>X</button>
                </div>
            </div>
        </div>
    );
};