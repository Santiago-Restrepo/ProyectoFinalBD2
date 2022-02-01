import React from 'react';

export const Header = ({ name }) =>{

    import('./estilos.sass');

    return(
        <header>
            <div>
                <img src="" alt="Logo del PCJIC" />
                <h2>Nombre de la app</h2>
                <div className="Links">
                    <a href="">Inicio</a>
                    <p className="NameProfile">Daniela</p>
                    <a href="">Salir ➡</a>
                </div>
            </div>
        </header>
    );
};