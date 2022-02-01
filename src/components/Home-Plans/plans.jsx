import React from 'react';

export const Plans = ( {asignature, year, periodo} ) =>{

    import('./estilosPlans.sass');
    return(
        <div className='Card'>
            <p>{asignature}</p>
            <p>{year} - {periodo}</p>
            <a href="">Ver plan</a>
        </div>
    );
};