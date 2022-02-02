import React from 'react';

export const Plans = ( {setShowDelete, value} ) =>{

    import('./estilosPlans.sass');

    return(
        <div className='Card'>
            <div className='ButtonDelete'>
                <button onClick={()=> setShowDelete({
                    show: true,
                    data: value
                })}>X</button>
            </div>
            <p>{value.asignatura}</p>
            <p>{value.semestre} - {value.periodo}</p>
            <a href="">Ver plan</a>
        </div>
    );
};