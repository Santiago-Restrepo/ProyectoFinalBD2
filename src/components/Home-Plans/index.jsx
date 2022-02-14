import React, { useEffect, useState, useContext } from 'react';
import { ScreenDelete } from '../Delete';
import { Context } from '../../Context';
import { Link } from 'react-router-dom';

/** ALERTS */
import Swal from 'sweetalert2';

//import data from './data.json';

import { Plans } from './plans';

export const HomePlans = () =>{
    const {userAutentication} = useContext(Context);
    const [data, setData] = useState({plans:"",render:false});
    const [showDelete, setShowDelete] = useState({show:false,datos:""});
    let s = 0;
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
            /** ERROR */
            let timerInterval
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: 'Ha sucedido un error 😫',
                timer: 3000,
                timerProgressBar: true,
                iconColor: '#DC143C',
                confirmButtonColor: '#DC143C',
                confirmButtonText: 'Vale',
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        }
    };

    useEffect(()=>{
        getPlans();
    },[]);

    useEffect(()=>{
        getPlans();
    },[data.render === true]);

    return(
        <div className='ContentHomePlans'> 
            <h2 className='TitlePlanes'>Planes</h2>
            <div className='PlansCards'>
                {
                    data.plans.length > 0 ?
                    data.plans.map((value,index)=>{
                        return( 
                            <Plans setShowDelete={setShowDelete} value={value} setData={setData} key={`asignatura-${index}`}/>
                        );
                    })
                    : data.render === false ? <h2 className='TitleEmpty'>Aún no tienes un plan de evaluación</h2>
                    :<h2 className='TitleEmpty'>Cargando...</h2>
                    /** LOADER QUE SE UTILIZA EN NEWPLAN */
                    // <div className="loader"><div></div><div></div><div></div><div></div></div>
                }
            </div>
                <button className='ButtonAdd'><Link to="/createPlan">+</Link></button>
                {
                    showDelete.show && <ScreenDelete dataShow={showDelete.datos} setShowDelete={setShowDelete} setData={setData}/>
                }
        </div>
    );
};