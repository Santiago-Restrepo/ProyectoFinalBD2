import React, {useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../../Context';

import logo from '../../assets/logo.svg'

export const Header = () =>{
    const {userAutentication, setUserAutentication} = useContext(Context);
    import('./estilos.sass');
    const history = useHistory();

    const handleExit = () =>{
        localStorage.setItem('userAutentication','{}');
        setUserAutentication({});
        history.push('/login');
    }
    return(
        <header>
                <img className='ImgLogo' src={logo} alt="Logo del PCJIC" />
                <h2>Nombre de la app</h2>
                <div className="Links">
                    <a href="">Inicio</a>
                    <p className="NameProfile">{userAutentication.User.name}</p>
                    <button className='Exit' onClick={handleExit}>Salir</button>
                </div>
        </header>
    );
};