import React, { useContext, useEffect } from 'react';
import { set } from 'react-hook-form';
import { Context } from '../../Context';

/** ALERTS */
import Swal from 'sweetalert2';

export const ScreenDelete = ( { dataShow, setShowDelete, setData } ) => {
    import('./estilos.sass');
    const {userAutentication} = useContext(Context);

    const handleClick = async () =>{
        //Petición a la bd para eliminar un plan
        try {
            const response = await fetch(`https://paseraspandoapi.vercel.app/planes/${dataShow._id}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userAutentication.token}`
                },
                method: 'DELETE'
            });
            const responseJson = await response.json();
            // console.log(responseJson);
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
        setShowDelete({
            show: false,
            datos: ""
        });
        setData({
            plans:"",
            render:true
        });
    }
    return(
        <div className='Content'>
            <div className="ContentDelete">
                <p>¿Deseas eliminar este plan de evaluación? {dataShow.asignatura}</p>
                <div className="ContentButtons">
                    <button className="Cancel" onClick={()=> setShowDelete({
                        show: false,
                        datos: ""
                    })}>Cancelar</button>
                    <button className="Acept" onClick={handleClick}>Eliminar</button>
                </div>
            </div>
        </div>
    );
}