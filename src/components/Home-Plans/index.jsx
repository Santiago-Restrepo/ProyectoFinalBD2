import React from 'react';
import { debug } from 'webpack';

import data from './data.json';

import { Plans } from './plans';

export const HomePlans = () =>{
    console.log(data)
    import('./estilos.sass');

    return(
        <>
            <div className='PlansCards'>
                {
                    data.length > 0 ?
                    data.map((value,index)=>{
                        return( 
                            <Plans asignature={value.asignatura} year={value.semestre} 
                            periodo={value.periodo} key={`asignatura-${index}`}/>
                        );
                    })
                    :<h2>Aún no tienes un plan de evaluación</h2>
                }
            </div>
            <button className='ButtonAdd'>+</button>     
        </>
    );
};