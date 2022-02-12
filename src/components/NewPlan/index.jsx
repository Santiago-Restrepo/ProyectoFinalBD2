/** LIBRERIAS */
import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Context } from '../../Context';

/** ESTILOS */
import './estilos.sass';

export const NewPlan = ({setPlan, mode, desabilitar1, desabilitar2}) => {
    const { register, handleSubmit, setValue } = useForm();
    const [ planInfo, setplanInfo ] = useState({});
    const [ buttonDisabled, setbuttonDisabled ] = useState(false);

    const { userAutentication } = useContext(Context);

    const periodos = ['1', '2'];
    
    const updateDatabase = (data) => {
		setPlan(data);
        setbuttonDisabled(true);
        desabilitar1(true);
    }

    useEffect(async () => {
        try {
            const responseAsignaturas = await fetch('https://paseraspandoapi.vercel.app/asignaturas');
            const responseJsonAsignaturas = await responseAsignaturas.json();
            // console.log(responseJsonAsignaturas);

            const responseGrupos = await fetch('https://paseraspandoapi.vercel.app/grupos');
            const responseJsonGrupos = await responseGrupos.json();
            // console.log(responseJsonGrupos);
            
            const responseDocentes = await fetch('https://paseraspandoapi.vercel.app/empleados');
            const responseJsonDocentes = await responseDocentes.json();
            // console.log(responseJsonDocentes);

            setplanInfo({
                asignaturas: responseJsonAsignaturas.asignaturas,
                grupos: responseJsonGrupos.grupos,
                docentes: responseJsonDocentes.empleados
            });

            if(mode){
                const responsePlanId = await fetch(`https://paseraspandoapi.vercel.app/plan/${mode}`,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userAutentication.token}`
                    }
                });
                const responseJsonPlanId = await responsePlanId.json();
                // console.log(responseJsonPlanId);

                setValue("semestre", responseJsonPlanId.users[0].semestre);
                setValue("periodo", responseJsonPlanId.users[0].periodo);
                setValue("asignatura", responseJsonPlanId.users[0].asignatura);
                setValue("grupo", responseJsonPlanId.users[0].grupo);
                setValue("docente", responseJsonPlanId.users[0].docente);
                setbuttonDisabled(true);
            }
        } catch (error) {
            alert("Ha sucedido un error 😫");
        }
        
    }, []);

    return (
        <div className='newPlan'>
            <form className="newPlan__form" id="newPlan__form" onSubmit={handleSubmit(updateDatabase)}>
                {
                    Object.keys(planInfo).length === 0 ?
                    <h1 className='newPlan__loader'>...Cargando Información...</h1>
                    :
                    <>
                        <fieldset>
                            <div className="newPlan__field">
                                <label htmlFor="semestre">Semestre</label>
                                <input input="semestre" id="semestre" type="text" required disabled={buttonDisabled} maxLength={4} {...register("semestre")} />
                            </div>
                            <div className="newPlan__field">
                                <label htmlFor="periodo">Periodo</label>
                                <select name="periodo" id="periodo" required disabled={buttonDisabled} {...register("periodo")} >
                                    <option value="">-</option>
                                    {
                                        periodos.map((periodo, index) => <option key={index} >{periodo}</option>)
                                    }
                                </select>
                            </div>
                            <div className="newPlan__field">
                                <label htmlFor="asignatura">Asignatura</label>
                                <select name="asignatura" id="asignatura" required disabled={buttonDisabled} {...register("asignatura")} >
                                    <option value="">-</option>
                                    {
                                        planInfo.asignaturas.map((asignatura, index) => <option key={index} >{asignatura.nombre}</option>)
                                    }
                                </select>
                            </div>
                            <div className="newPlan__field">
                                <label htmlFor="grupo">Grupo</label>
                                <select name="grupo" id="grupo" required disabled={buttonDisabled} {...register("grupo")} >
                                    <option value="">-</option>
                                    {
                                        planInfo.grupos.map((grupo, index) => <option key={index} >{grupo.numero}</option>)
                                    }
                                </select>
                            </div>
                            <div className="newPlan__field">
                                <label htmlFor="docente">Docente</label>
                                <select name="docente" id="docente" required disabled={buttonDisabled} {...register("docente")} >
                                    <option value="">-</option>
                                    {
                                        planInfo.docentes.map((docente, index) => <option key={index} >{docente.nombres + " " + docente.apellidos}</option>)
                                    }
                                </select>
                            </div>
                        </fieldset>
                        <div className="newPlan__buttons">
                            <button 
                                className="newPlan__submitBtn" 
                                title='Confirmar cambios'
                                type='submit'
                                form='newPlan__form'
                                disabled={buttonDisabled} >Confirmar</button>
                            <button 
                                className="newPlan__cancelBtn" 
                                title='Editar cambios' 
                                disabled={!buttonDisabled}
                                onClick={() => {setbuttonDisabled(false); desabilitar2(true);}} >Editar</button>
                        </div>
                    </>
                }
            </form>
        </div>
    );
};