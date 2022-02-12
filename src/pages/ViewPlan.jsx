/** LIBRERIAS */
import React, { useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

/** COMPONENTES */
import { Header } from '../components/Header';
import { NewPlan } from '../components/NewPlan';
import { Notes } from '../components/Notes';

/** CONTEXTO */
import { Context } from '../Context';

/** ESTILOS */
import './viewPlan.sass';

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
        } catch (error) {
            alert("Ha sucedido un error 😫");
        }
    }

    const getFinalNote = async () => {
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
            acumulador += parseFloat(nota.nota)*(parseFloat(nota.porcentaje)/100);
        });

        alert("Reporte de notas - Su Nota Final es: " + acumulador.toFixed(3));
    }

    return (
        <>
            <Header/>
            <div className="plans">
                <h3 className='firstTitle'>Nuevo plan de evaluación</h3>
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