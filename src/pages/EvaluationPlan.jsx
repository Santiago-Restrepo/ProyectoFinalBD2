import React from 'react';

import { Header } from '../components/Header';
import { NewPlan } from '../components/NewPlan';
import { Notes } from '../components/Notes';

export const EvaluationPlan = () => {


    return (
        <>
            <Header/>
            <div className="plans">
                <h3 className='firstTitle'>Nuevo plan de evaluación</h3>
                <NewPlan/>
                <h3 className='secondTitle'>Ingreso de notas</h3>
                <Notes/>
            </div>
        </>
    );
};