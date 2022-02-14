import React from 'react';
import logo from '../../assets/Logotipo.svg';

export const HeaderLogin = () => {

    import('./estilosHeaderLogin.sass');
 
    return(
        <header className='loginHeader'>
            <img className='ImgLogo' src={logo} alt="Logotipo de Pasé Raspando" />
        </header>
    );
}