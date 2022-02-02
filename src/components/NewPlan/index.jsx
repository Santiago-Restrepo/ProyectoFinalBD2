import React, { useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import './estilos.sass';

export const NewPlan = () => {
    const [ editable, setEditable ] = useState(false);
    const { register, handleSubmit, setValue } = useForm();

    const newPlan = {
        id: '1',
        semestre: '2021',
        periodo: '2',
        grupo: '1',
        asignatura: 'Bases de datos 2',
        docente: 'Monica Rojas'
    }
    
    const updateDatabase = (data) => {
        console.log(data);
        // ACTUALIZAR EN LA BASE DE DATOS
        setEditable(false);
    }
    
    useLayoutEffect(() => {
        const setValuesDatabase = (database) => {
            setValue("semestre", database.semestre);
            setValue("periodo", database.periodo);
            setValue("grupo", database.grupo);
            setValue("asignatura", database.asignatura);
            setValue("docente", database.docente);
        }
        setValuesDatabase(newPlan);
    });

    return (
        <div className='newPlan'>
            <form className="newPlan__form" onSubmit={handleSubmit(updateDatabase)}>
                <fieldset disabled={!editable}>
                    <label htmlFor="semestre">Semestre</label>
                    <input input="semestre" type="text" {...register("semestre", {required: true, maxLength: 4})} />
                    <label htmlFor="periodo">Periodo</label>
                    <input input="periodo" type="text" {...register("periodo", {required: true, maxLength: 1})} />
                    <label htmlFor="grupo">Grupo</label>
                    <input input="grupo" type="text" {...register("grupo", {required: true, maxLength: 1})} />
                    <label htmlFor="asignatura">Asignatura</label>
                    <input input="asignatura" type="text" {...register("asignatura", {required: true, maxLength: 40})} />
                    <label htmlFor="docente">Docente</label>
                    <input input="docente" type="text" {...register("docente", {required: true, maxLength: 40})} />
                </fieldset>
                {
                    editable ?
                        <>
                            <input className="newPlan__submitBtn" type="submit" value="Actualizar" />
                            <button onClick={() => setEditable(false)}>Cancelar</button>
                        </>
                    :
                        <button onClick={() => setEditable(true)}>Lapicito</button>
                }
            </form>
        </div>
    );
};
