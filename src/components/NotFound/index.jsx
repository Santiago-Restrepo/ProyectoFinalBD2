import React from 'react';
import notFoundImage from '../../assets/notFound.png'
import './styles.sass';

export const NotFoundContent = () => {
    return (
        <>
            <section className='notFound'>
                <h1>Oops!</h1>
                <p>Error 404 - Página no encontrada</p>
                <img src={notFoundImage} alt="404 image" />
            </section>
        </>
    )
}