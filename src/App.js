import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { EvaluationPlan } from './pages/EvaluationPlan';
import { NotFound } from './pages/NotFound'
import { Context } from './Context';
import { Nuevo } from './pages/crear';

/** Componentes */

/** Estilos globales */
import './global.sass';

/** Contexto */ 
export const App = () => {

    const localStorageUserAutentication = JSON.parse(localStorage.getItem('userAutentication'));
    const [userAutentication, setUserAutentication] = useState(localStorageUserAutentication ? localStorageUserAutentication : {});
    return (
        userAutentication &&
        <>
            <Context.Provider value={{
                userAutentication,
                setUserAutentication
            }
            }>
                    <BrowserRouter>
                        { /** Lo que cambiará */}
                        <Switch>
                            <Route exact path="/" component={Register} />
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/evaluation-plan" component={EvaluationPlan} />
                            <Route exact path="/profile" component={Profile} />
                            <Route exact path="/nuevo" component={Nuevo} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </BrowserRouter>
            </Context.Provider>
        </>
        
    )
}