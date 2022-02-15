/** LIBRERIAS */
import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Context } from '../../Context';

/** ESTILOS */
import './estilos.sass';

/** ALERTS */
import Swal from 'sweetalert2';

export const NewPlan = ({setPlan, mode, desabilitar1, desabilitar2}) => {
    const { register, handleSubmit, setValue } = useForm();
    const [ planInfo, setplanInfo ] = useState({});
    const [ buttonDisabled, setbuttonDisabled ] = useState(false);

    const { userAutentication } = useContext(Context);

    const periodos = ['1', '2'];

    const updateDatabase = (data) => {
        data.asignatura = JSON.parse(data.asignatura).nombre;
        data.grupo = JSON.parse(data.grupo).numero;
		setPlan(data);
        setbuttonDisabled(true);
        desabilitar1(true);
    }

    const fetchGroups = async (e) => {
        if(e.target.selectedIndex != 0) {
            const responseGrupos = await fetch('https://paseraspandoapi.vercel.app/grupos', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    signatureId: JSON.parse(e.target.value).codigo
                })
            });
            const responseJsonGrupos = await responseGrupos.json();
            setplanInfo({
                asignaturas: planInfo.asignaturas,
                grupos: responseJsonGrupos.grupos,
                docentes: []
            });
            let selectGroup = e.target.parentElement.parentElement.childNodes[3].childNodes[1];
            selectGroup.selectedIndex = 0;
        } else {
            let selectGroup = e.target.parentElement.parentElement.childNodes[3].childNodes[1];
            selectGroup.selectedIndex = 0;
            let selectTeacher = e.target.parentElement.parentElement.childNodes[4].childNodes[1];
            selectTeacher.selectedIndex = 0;
        }
    }
    
    const fetchTeachers = async (e) => {
        if(e.target.selectedIndex != 0) {
            const responseDocentes = await fetch('https://paseraspandoapi.vercel.app/empleados', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    teacherId: JSON.parse(e.target.value).id_profesor
                })
            });
            const responseJsonDocentes = await responseDocentes.json();
            setplanInfo({
                asignaturas: planInfo.asignaturas,
                grupos: planInfo.grupos,
                docentes: responseJsonDocentes.empleados
            });
        } else {
            let selectTeacher = e.target.parentElement.parentElement.childNodes[4].childNodes[1];
            selectTeacher.selectedIndex = 0;
        }
    }
    
    useEffect(async () => {
        try {
            const responseAsignaturas = await fetch('https://paseraspandoapi.vercel.app/asignaturas', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    programId: userAutentication.User.program
                })
            });
            const responseJsonAsignaturas = await responseAsignaturas.json();

            if(mode) {
                const responsePlanId = await fetch(`https://paseraspandoapi.vercel.app/plan/${mode}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userAutentication.token}`
                    }
                });
                const responseJsonPlanId = await responsePlanId.json();
                
                let codigoAsignatura = '';
                responseJsonAsignaturas.asignaturas.forEach(asignatura => {
                    if(asignatura.nombre === responseJsonPlanId.users[0].asignatura) {
                        codigoAsignatura = asignatura.codigo;
                    }
                });
                const responseGrupos = await fetch('https://paseraspandoapi.vercel.app/grupos', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        signatureId: codigoAsignatura
                    })
                });
                const responseJsonGrupos = await responseGrupos.json();
                
                let idProfesor = '';
                responseJsonGrupos.grupos.forEach(grupo => {
                    if(grupo.numero === responseJsonPlanId.users[0].grupo) {
                        idProfesor = grupo.id_profesor;
                    }
                });
                const responseDocentes = await fetch('https://paseraspandoapi.vercel.app/empleados', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        teacherId: idProfesor
                    })
                });
                const responseJsonDocentes = await responseDocentes.json();
                
                setplanInfo({
                    asignaturas: responseJsonAsignaturas.asignaturas,
                    grupos: responseJsonGrupos.grupos,
                    docentes: responseJsonDocentes.empleados
                });

                setValue("semestre", responseJsonPlanId.users[0].semestre);
                setValue("periodo", responseJsonPlanId.users[0].periodo);
                setValue("asignatura", JSON.stringify({codigo: codigoAsignatura, nombre: responseJsonPlanId.users[0].asignatura}));
                setValue("grupo", JSON.stringify({id_profesor: idProfesor, numero: responseJsonPlanId.users[0].grupo}));
                setValue("docente", responseJsonPlanId.users[0].docente);
                
                setbuttonDisabled(true);
            } else {
                setplanInfo({
                    asignaturas: responseJsonAsignaturas.asignaturas,
                    grupos: [],
                    docentes: []
                });
            }
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
        
    }, []);

    return (
        <div className='newPlan'>
            <form className="newPlan__form" id="newPlan__form" onSubmit={handleSubmit(updateDatabase)}>
                {
                    Object.keys(planInfo).length === 0 ?
                    <div className="loader"><div></div><div></div><div></div><div></div></div>
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
                                <select name="asignatura" id="asignatura" required disabled={buttonDisabled} {...register("asignatura")} 
                                    onChange={(e) => fetchGroups(e)}>
                                    <option value="">-</option>
                                    {
                                        planInfo.asignaturas.map((asignatura, index) => <option key={index} value={JSON.stringify({codigo: asignatura.codigo, nombre: asignatura.nombre})} >{asignatura.nombre}</option>)
                                    }
                                </select>
                            </div>
                            <div className="newPlan__field">
                                <label htmlFor="grupo">Grupo</label>
                                <select name="grupo" id="grupo" required disabled={buttonDisabled} {...register("grupo")}
                                    onChange={(e) => fetchTeachers(e)}>
                                    <option value="">-</option>
                                    {
                                        planInfo.grupos.map((grupo, index) => <option key={index} value={JSON.stringify({id_profesor: grupo.id_profesor, numero: grupo.numero})} >{grupo.numero}</option>)
                                    }
                                </select>
                            </div>
                            <div className="newPlan__field">
                                <label htmlFor="docente">Docente</label>
                                <select name="docente" id="docente" required  disabled={buttonDisabled} {...register("docente")}>
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