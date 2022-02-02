import React, { useState } from 'react';
import { debug } from 'webpack';
import { ScreenDelete } from '../Delete';


import data from './data.json';

import { Plans } from './plans';

export const HomePlans = () =>{
    const [showDelete, setShowDelete] = useState({show:false,data:""});
    import('./estilos.sass');

    return(
        <>
            <div className='PlansCards'>
                {
                    data.length > 0 ?
                    data.map((value,index)=>{
                        return( 
                            <Plans setShowDelete={setShowDelete} value={value} key={`asignatura-${index}`}/>
                        );
                    })
                    :<h2>Aún no tienes un plan de evaluación</h2>
                }
            </div>
                <button className='ButtonAdd'><a href="">+</a></button>     
                {
                    showDelete.show && <ScreenDelete data={showDelete.data} setShowDelete={setShowDelete}/>
                }
        </>
    );
};