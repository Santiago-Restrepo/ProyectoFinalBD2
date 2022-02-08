/** LIBRERIAS */
import React, { useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';

/** ESTILOS */
import './estilos.sass';

export const NewPlan = ({dataPlan}) => {
    const { register, handleSubmit, setValue } = useForm();

    const periodos = ['1', '2'];

    const grupos = ['G-01', 'G-02', 'G-03'];

    const asignaturas = ['Calculo diferencial', 'Bases de datos 2', 'Algoritmos y programación', 'Estadistica aplicada'];

    const docentes = ['Monica Rojas', 'Luz Paez', 'Eva luna', 'Luis Gonzalo'];

    const newPlan = {
        id: '1',
        semestre: '2021',
        periodo: '2',
        grupo: 'G-03',
        asignatura: 'Bases de datos 2',
        docente: 'Monica Rojas'
    }
    
    const updateDatabase = (data) => {
        dataPlan(data);
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
            <form className="newPlan__form" id="newPlan__form" onSubmit={handleSubmit(updateDatabase)}>
                <fieldset>
                    <div className="newPlan__field">
                        <label htmlFor="semestre">Semestre</label>
                        <input input="semestre" id="semestre" type="text" {...register("semestre", {required: true, maxLength: 4})} />
                    </div>
                    <div className="newPlan__field">
                        <label htmlFor="periodo">Periodo</label>
                        <select name="periodo" id="periodo" {...register("periodo")} >
                            {
                                periodos.map((periodo, index) => <option key={index} >{periodo}</option>)
                            }
                        </select>
                    </div>
                    <div className="newPlan__field">
                        <label htmlFor="asignatura">Asignatura</label>
                        <select name="asignatura" id="asignatura" {...register("asignatura")} >
                            {
                                asignaturas.map((asignatura, index) => <option key={index} >{asignatura}</option>)
                            }
                        </select>
                    </div>
                    <div className="newPlan__field">
                        <label htmlFor="grupo">Grupo</label>
                        <select name="grupo" id="grupo" {...register("grupo")} >
                            {
                                grupos.map((grupo, index) => <option key={index} >{grupo}</option>)
                            }
                        </select>
                    </div>
                    <div className="newPlan__field">
                        <label htmlFor="docente">Docente</label>
                        <select name="docente" id="docente" {...register("docente")} >
                            {
                                docentes.map((docente, index) => <option key={index} >{docente}</option>)
                            }
                        </select>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};