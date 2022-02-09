/** LIBRERIAS */
import React, { useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

/** COMPONENTES */
import { Header } from '../components/Header';
import { NewPlan } from '../components/NewPlan';
import { Notes } from '../components/Notes';

/** CONTEXTO */
import { Context } from '../Context';

export const ViewPlan = () => {
    /** VALIDACIÓN SI EL TOKEN YA EXISTE */
    const history = useHistory();
    const {userAutentication, setUserAutentication} = useContext(Context);
    Object.keys(userAutentication).length === 0 && history.push('/login');
    
    const [ enviarPlan, setenviarPlan ] = useState({});

    const saveData = () => {
        
    }
    
    let {id} = useParams();

    return (
        <>
            <Header/>
            <div className="plans">
                <h3 className='firstTitle'>Nuevo plan de evaluación</h3>
                <NewPlan setPlan={setenviarPlan} mode={id}/>
                <h3 className='secondTitle'>Ingreso de notas</h3>
                <Notes/>
            </div>
            <button className="btnGuardarPlan" onClick={() => saveData()} >Guardar Plan</button>
        </>
    );
};