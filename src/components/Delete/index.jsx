import React, { useContext } from 'react';
import { set } from 'react-hook-form';
import { Context } from '../../Context';

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
                    <button className="Acept" onClick={handleClick}>Confirmar</button>
                </div>
            </div>
        </div>
    );
}