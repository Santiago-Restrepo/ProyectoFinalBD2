import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {Register} from './pages/Register'
import {Login} from './pages/Login'
import {Home} from './pages/Home'
import {Profile} from './pages/Profile'
import {Chat} from './pages/Chat'
import {NotFound} from './pages/NotFound'
import { Context } from './Context';

/** Componentes */

/** Estilos globales */
import './global.sass';

/** Contexto */ 
export const App = () => {

    return (
        <Context.Provider value={"hola:1"}>
                <BrowserRouter>
                    { /** Lo que cambiará */}
                    <Switch>
                        <Route exact path="/" component={Register} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/chat" component={Chat} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </BrowserRouter>
        </Context.Provider>
    )
}