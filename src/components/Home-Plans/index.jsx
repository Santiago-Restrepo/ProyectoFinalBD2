import React, { useEffect, useState, useContext } from 'react';
import { ScreenDelete } from '../Delete';
import { Context } from '../../Context';

//import data from './data.json';

import { Plans } from './plans';

export const HomePlans = () =>{
    const {userAutentication} = useContext(Context);
    const [data, setData] = useState("");
    const [showDelete, setShowDelete] = useState({show:false,data:""});
    import('./estilos.sass');

    const getPlans = async () =>{
        const response = await fetch('https://paseraspandoapi.vercel.app/planes',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userAutentication.token}`
            },
            method: 'GET'
        });
        const responseJson = await response.json();
        setData(responseJson.Planes);
        console.log(responseJson);
    }
    useEffect(()=>{
        getPlans();
    },[])

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
                    :<h2 className='TitleEmpty'>Aún no tienes un plan de evaluación</h2>
                }
            </div>
                <button className='ButtonAdd'><a href="">+</a></button>     
                {
                    showDelete.show && <ScreenDelete data={showDelete.data} setShowDelete={setShowDelete}/>
                }
        </>
    );
};