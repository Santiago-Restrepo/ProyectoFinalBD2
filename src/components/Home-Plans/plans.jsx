import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Context } from '../../Context';

export const Plans = ( {setData, value} ) =>{
    const {userAutentication} = useContext(Context);
    import('./estilosPlans.sass');
    console.log(value)

    const showModal = ()=>{
        Swal.fire({
            title: '¿Estás seguro que deseas eliminar este plan de estudios?',
            text: `${value.asignatura}`,
            icon: 'warning',
            iconColor: '#E8C63E',
            showCancelButton: true,
            confirmButtonColor: '#DC143C',
            cancelButtonColor: '#545454',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                //Petición a la bd para eliminar un plan
                try {
                    const response = await fetch(`https://paseraspandoapi.vercel.app/planes/${value._id}`,{
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userAutentication.token}`
                        },
                        method: 'DELETE'
                    });
                    const responseJson = await response.json();
                    Swal.fire({
                        title: 'Eliminado!',
                        text: 'Tú plan de estudios ha sido eliminado exitosamente.',
                        icon: 'success',
                        confirmButtonColor: '#00923F',
                        confirmButtonText: 'Vale',
                        iconColor: '#00923F'
                    }
                    ).then((result)=>{
                        if(result.isConfirmed){
                            setData({
                                plans:"",
                                render:true
                            });
                        }
                    })
                } catch (error) {
                    console.error(error);
                }
            }
        })
    }
    return(
        <div className='Card'>
            <p className='Asignature'>{value.asignatura}</p>
            <p>{value.docente}</p>
            <p>{value.semestre} - {value.periodo}</p>
            <div className='ContentButtons'>
                <button className='ContentLink'><Link to={`/viewPlan/${value._id}`}>Ver plan</Link></button>
                <div className='ButtonDelete'>
                    <button onClick={showModal}>X</button>
                </div>
            </div>
        </div>
    );
};