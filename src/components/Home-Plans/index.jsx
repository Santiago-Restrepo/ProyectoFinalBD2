import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Context';
import { Link } from 'react-router-dom';

/** ALERTS */
import Swal from 'sweetalert2';

//import data from './data.json';

import { Plans } from './plans';

export const HomePlans = () =>{
    const {userAutentication} = useContext(Context);
    const [data, setData] = useState({plans:"",render:false});
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
    },[data.render === true]);

    return(
        <div className='ContentHomePlans'> 
            <h2 className='TitlePlanes'>Planes</h2>
            {data.plans === "" ? <div className="loader"><div></div><div></div><div></div><div></div></div> 
                :<div className='PlansCards'>
                    {
                        data.plans.length > 0 ?
                        data.plans.map((value,index)=>{
                            return( 
                                <Plans value={value} setData={setData} key={`asignatura-${index}`}/>
                            );
                        })
                        :<h2 className='TitleEmpty'>Aún no tienes un plan de evaluación</h2>
                        /** LOADER QUE SE UTILIZA EN NEWPLAN */
                        // <div className="loader"><div></div><div></div><div></div><div></div></div>
                    }
                </div>
            }
                <button className='ButtonAdd'><Link to="/createPlan">+</Link></button>
        </div>
    );
};