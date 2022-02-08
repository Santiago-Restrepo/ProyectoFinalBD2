import React from 'react';

import logo from '../../assets/logo.svg'

export const Header = ({ userAutentication }) =>{

    import('./estilos.sass');

    const handleExit = () =>{
        localStorage.setItem('userAutentication','{}')
    }
    return(
        <header>
                <img className='ImgLogo' src={logo} alt="Logo del PCJIC" />
                <h2>Nombre de la app</h2>
                <div className="Links">
                    <a href="">Inicio</a>
                    <p className="NameProfile">{userAutentication.User.name}</p>
                    <button className='Exit' onClick={handleExit()}>Salir</button>
                </div>
        </header>
    );
};