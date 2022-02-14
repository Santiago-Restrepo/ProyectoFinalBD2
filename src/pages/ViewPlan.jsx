/** LIBRERIAS */
import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';

/** COMPONENTES */
import { Header } from '../components/Header';
import { NewPlan } from '../components/NewPlan';
import { Notes } from '../components/Notes';

/** CONTEXTO */
import { Context } from '../Context';

/** ESTILOS */
import './viewPlan.sass';

/** ALERTS */
import Swal from 'sweetalert2';

export const ViewPlan = () => {
    /** VALIDACIÓN SI EL TOKEN YA EXISTE */
    const history = useHistory();
    const {userAutentication, setUserAutentication} = useContext(Context);
    Object.keys(userAutentication).length === 0 && history.push('/login');
    
    const [ Plan, setPlan ] = useState({});

    const [ notes, setNotes ] = useState([]);

    const [ buttonDisabled1, setbuttonDisabled1 ] = useState(false);
    const [ buttonDisabled2, setbuttonDisabled2 ] = useState(false);

    let {id} = useParams();

    const updateData = async () => {
        try {
            if(Object.keys(Plan).length !== 0){
                //** ACTUALIZAR A LA BASE DE DATOS DEL NEWPLAN */
                const responseUpdatePlan = await fetch(`https://paseraspandoapi.vercel.app/plan/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userAutentication.token}`
                    },
                    method: 'PUT',
                    body: JSON.stringify(Plan)
                });
        
                const responseJsonUpdatePlan = await responseUpdatePlan.json();
                // console.log(responseJsonUpdatePlan);
            }

            if(notes.length !== 0){
                //** ACTUALIZAR A LA BASE DE DATOS DE NOTAS */
                const responseUpdateNotes = await fetch(`https://paseraspandoapi.vercel.app/notes/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userAutentication.token}`
                    },
                    method: 'PUT',
                    body: JSON.stringify(notes)
                });
                
                const responseJsonUpdateNotes = await responseUpdateNotes.json();
                // console.log(responseJsonUpdateNotes);
            }
            setbuttonDisabled1(false);
            setbuttonDisabled2(false);

            /** SUCCESS */
            Swal.fire({
                icon: 'success',
                title: '¡Felicidades! 🎉',
                html: 'Se ha actualizado tu plan de evaluación correctamente! 😄',
                confirmButtonColor: '#00923F',
                confirmButtonText: 'Vale',
                iconColor: '#00923F'
            })

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
    }

    const getFinalNote = async () => {
        try {
            const responseNotesId = await fetch(`https://paseraspandoapi.vercel.app/notes/${id}`,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userAutentication.token}`
                    }
                });
    
            const responseJsonNotesId = await responseNotesId.json();
            // console.log(responseJsonNotesId);
    
            let acumulador = 0.0;
    
            responseJsonNotesId.Notas.map((nota) => {
                acumulador += parseFloat(nota.nota === '' ? 0 :nota.nota)*(parseFloat(nota.porcentaje === '' ? 0 :nota.porcentaje)/100);
            });
            
            /** SIN ICON */
            Swal.fire({
                title: '🍻 Reporte de notas 🍻',
                imageUrl: acumulador >= 4.0 ? 'https://c.tenor.com/XKaBt25ajDMAAAAC/feliz-muy-feliz.gif' 
                : acumulador >= 3.0 ? 'https://media4.giphy.com/media/s6EYTqTRqujIY/giphy.gif?cid=790b761129cba503641e133d848e9f6c094204f17a701dd6&rid=giphy.gif&ct=g' 
                : 'https://media3.giphy.com/media/jUwpNzg9IcyrK/giphy.gif?cid=ecf05e47bs91y379lya1kih2sk16sl4kb0wze9xg9tf2efov&rid=giphy.gif&ct=g',
                imageWidth: 260,
                imageHeight: 180,
                imageAlt: 'Lisa Bailando',
                html: `Su Nota Final es: ${acumulador.toFixed(3)}`,
                confirmButtonColor: '#E8C63E',
                confirmButtonText: 'Vale',
            })
            
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
    }

    return (
        <>
            <Helmet>
                    <title>Plan - Pasé Raspando</title>
                    <meta name="description" content="Contenido del plan de estudios" />
            </Helmet>
            <Header/>
            <div className="plans">
                <h3 className='firstTitle'>Plan de evaluación</h3>
                <NewPlan setPlan={setPlan} mode={id} desabilitar1={setbuttonDisabled1} desabilitar2={setbuttonDisabled2} />
                <h3 className='secondTitle'>Ingreso de notas</h3>
                <Notes setNotes={setNotes} mode={id} desabilitar1={setbuttonDisabled1} desabilitar2={setbuttonDisabled2} />
            </div>
            <div className="containerBtn">
                <button 
                className="btnActualizarPlan" 
                onClick={() => updateData()}
                disabled={!buttonDisabled1} >Actualizar plan</button>
                <button 
                className="btnReporte"
                disabled={buttonDisabled2}
                onClick={() => getFinalNote()} >Generar reporte</button>
            </div>
        </>
    );
};