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

    const [notes, setNotes] = useState({});//estado para guardar la data entre padre e hijo
    const [click, setClick] = useState(false);//estado para saber cuando hacer autoclick en los hijos

    const [ enviarPlan, setEnviarPlan ] = useState({});

    /***no olvidar el setClick(false) */
    
    const saveData = () => {
        setClick(true);
        console.log(notes);
        console.log(enviarPlan);
    }

    return (
        <>
            <Header/>
            <div className="plans">
                <h3 className='firstTitle'>Nuevo plan de evaluación</h3>
                <NewPlan setPlan={setEnviarPlan} />
                <h3 className='secondTitle'>Ingreso de notas</h3>
                <Notes setNotes={setNotes} click = {click} setClick = {setClick}/>
            </div>
            <button className="btnGuardarPlan" form="newPlan__form" onClick={()=> saveData()}>Guardar plan</button>{/**cambia nombre por props */}
        </>
    );
};