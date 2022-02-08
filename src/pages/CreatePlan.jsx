/** LIBRERIAS */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

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

    return (
        <>
            <Header/>
            
        </>
    );
};