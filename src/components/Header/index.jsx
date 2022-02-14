import React, {useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Context } from '../../Context';

import logo from '../../assets/logoHeaderIsa.svg'

export const Header = () =>{
    const {userAutentication, setUserAutentication} = useContext(Context);
    import('./estilos.sass');
    const history = useHistory();
    const name = userAutentication.User.name.split(" ")[0];
 
    const handleExit = () =>{
        localStorage.setItem('userAutentication','{}');
        setUserAutentication({});
        history.push('/login');
    }
    return(
        <header className='header'>
                <img className='ImgLogo' src={logo} alt="Logo de la app" />
                <nav className="Links">
                    <Link to="/home">Inicio</Link>
                    <p className="NameProfile">{name}</p>
                    <button className='Exit' onClick={handleExit}>Salir</button>
                </nav>
        </header>
    );
};