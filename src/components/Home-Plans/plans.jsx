import React from 'react';
import { Link } from 'react-router-dom';

export const Plans = ( {setShowDelete, value} ) =>{

    import('./estilosPlans.sass');
    return(
        <div className='Card'>
            <div className='ButtonDelete'>
                <button onClick={()=> setShowDelete({
                    show: true,
                    datos: value
                })}>X</button>
            </div>
            <p>{value.asignatura}</p>
            <p>{value.semestre} - {value.periodo}</p>
            <Link to={`/viewPlan/${value._id}`}>Ver plan</Link>
        </div>
    );
};