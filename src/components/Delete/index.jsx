import React from 'react';
export const ScreenDelete = ( { data, setShowDelete } ) => {
    import('./estilos.sass');

    const handleClick = () =>{
        //Petición a la bd para eliminar un plan
        setShowDelete({
            show: false,
            data: ""
        })
    }
    return(
        <div className='Content'>
            <div className="ContentDelete">
                <p>¿Deseas eliminar este plan de evaluación? {data.asignatura}</p>
                <div className="ContentButtons">
                    <button className="Cancel" onClick={()=> setShowDelete({
                        show: false,
                        data: ""
                    })}>Cancelar</button>
                    <button className="Acept" onClick={handleClick}>Confirmar</button>
                </div>
            </div>
        </div>
    );
}