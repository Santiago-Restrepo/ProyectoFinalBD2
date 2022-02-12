/** LIBRERIAS */
import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

/** COMPONENTES */
import { Header } from '../components/Header';
import { NewPlan } from '../components/NewPlan';
import { Notes } from '../components/Notes';

/** CONTEXTO */
import { Context } from '../Context';

export const CreatePlan = () => {
    /** VALIDACIÓN SI EL TOKEN YA EXISTE */
    const history = useHistory();
    const { userAutentication } = useContext(Context);
    Object.keys(userAutentication).length === 0 && history.push('/login');

    const [ enviarPlan, setEnviarPlan ] = useState({});
    
    const [ notes, setNotes ] = useState([]);//estado para guardar la data entre padre e hijo

    const [ buttonDisabled1, setbuttonDisabled1 ] = useState(false);
    const [ buttonDisabled2, setbuttonDisabled2 ] = useState(false);

    const saveData = async () => {
        try {
            //** ENVIO A LA BASE DE DATOS DEL NEWPLAN */
            const responsePlan = await fetch('https://paseraspandoapi.vercel.app/new_plan', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userAutentication.token}`
                },
                method: 'POST',
                body: JSON.stringify(enviarPlan)
            });
    
            const responseJsonPlan = await responsePlan.json();
            // console.log(responseJsonPlan);

            const PLAN_ID = responseJsonPlan.newPlan.insertedId;
            
            //** ENVIO A LA BASE DE DATOS DE NOTES */
            const responseNotes = await fetch(`https://paseraspandoapi.vercel.app/new_note/${PLAN_ID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userAutentication.token}`
                },
                method: 'POST',
                body: JSON.stringify(notes)
            });
    
            const responseJsonNotes = await responseNotes.json();
            // console.log(responseJsonNotes);
            
            history.push('/home');
        } catch (error) {
            alert("Ha sucedido un error 😫");
        }
        
    }

    let {id} = useParams();

    return (
        <>
            <Header/>
            <div className="plans">
                <h3 className='firstTitle'>Nuevo plan de evaluación</h3>
                <NewPlan setPlan={setEnviarPlan} mode={id} desabilitar1={setbuttonDisabled1} desabilitar2={setbuttonDisabled2} />
                <h3 className='secondTitle'>Ingreso de notas</h3>
                <Notes setNotes={setNotes} mode={id} desabilitar1={setbuttonDisabled1} desabilitar2={setbuttonDisabled2} />
            </div>
            <div className="containerBtn">
                <button className="containerBtn__SavePlan" onClick={() => saveData()} disabled={Object.keys(enviarPlan).length === 0 || Object.keys(notes).length === 0} >Guardar plan</button>{/**cambia nombre por props */}
            </div>
        </>
    );
};