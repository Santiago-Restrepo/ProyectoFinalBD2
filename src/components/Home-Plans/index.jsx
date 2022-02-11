import React, { useEffect, useState, useContext } from 'react';
import { ScreenDelete } from '../Delete';
import { Context } from '../../Context';
import { Link } from 'react-router-dom';


//import data from './data.json';

import { Plans } from './plans';

export const HomePlans = () =>{
    const {userAutentication} = useContext(Context);
    const [data, setData] = useState({plans:"",render:false});
    const [showDelete, setShowDelete] = useState({show:false,datos:""});
    import('./estilos.sass');

    const getPlans = async () =>{
        try {
            const response = await fetch('https://paseraspandoapi.vercel.app/planes',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userAutentication.token}`
                },
                method: 'GET'
            });
            const responseJson = await response.json();
            setData({
                plans: responseJson.Planes,
                render: false
            });  
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(()=>{
        getPlans();
    },[])
    useEffect(()=>{
        getPlans();
    },[data.render === true])

    return(
        <> 
            <div className='PlansCards'>
                {
                    data.plans.length > 0 ?
                    data.plans.map((value,index)=>{
                        return( 
                            <Plans setShowDelete={setShowDelete} value={value} key={`asignatura-${index}`}/>
                        );
                    })
                    : data.render === false ? <h2 className='TitleEmpty'>Aún no tienes un plan de evaluación</h2>
                    :<h2 className='TitleEmpty'></h2>
                }
            </div>
                <button className='ButtonAdd'><Link to="/createPlan">+</Link></button>
                {
                    showDelete.show && <ScreenDelete dataShow={showDelete.datos} setShowDelete={setShowDelete} setData={setData}/>
                }
        </>
    );
};