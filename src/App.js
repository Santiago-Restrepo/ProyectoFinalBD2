import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { CreatePlan } from './pages/CreatePlan';
import { ViewPlan } from './pages/ViewPlan';
import { NotFound } from './pages/NotFound'
import { Context } from './Context';

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
                            <Route exact path="/createPlan" component={CreatePlan} />
                            <Route exact path="/viewPlan" component={ViewPlan} />
                            <Route exact path="/profile" component={Profile} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </BrowserRouter>
            </Context.Provider>
        </>
        
    )
}