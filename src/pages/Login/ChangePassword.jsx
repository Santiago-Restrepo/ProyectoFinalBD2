import React, { useState, useContext } from 'react';
import { Link , Redirect, useHistory} from 'react-router-dom';
import { useForm } from "react-hook-form";
import logo from '../../assets/logo.svg'
import { Context } from '../../Context';

export const ChangePassword = () => {

    let TokenRecovery = location.href.split('=')[1];

    const history = useHistory();
    const { register, handleSubmit, reset } = useForm();

    const queryDatabase = async (data) => {
        /*Consulta a la base de datos*/
        try {
            
        //     const user = {
        //         data: '',
        //         logged: false
        //     };
    
        //     const response = await fetch('https://paseraspandoapi.vercel.app/login',{
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         method: 'POST',
        //         body: JSON.stringify({
        //             email: data.email,
        //             password: data.password
        //         })
        //     });
    
        //     const jsonResponse = await response.json();
        //     setUserAutentication(jsonResponse);
            
        //     history.push('/home')
                // console.log(data);
            
        } catch (error) {
            alert('Usuario o contraseña incorrectos')
            console.error(error)
        }
    }
    
    return (
        <>
            <Helmet>
                <title>Pasé Raspando - Restablecer contraseña</title>
                <meta name="description" content="Restablece tu contraseña" />
            </Helmet>
            <main className='singInUpMain'>
                <header>
                    <img src={logo} alt="" />
                </header>
                <section className='hero'>
                    <h1>Nombre de la app</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum iste, iusto temporibus vel sapiente architecto dolor expedita est, at ducimus aliquid earum illo minus dolorem.</p>
                </section>
                <>
                    <form className="registerForm" onSubmit={handleSubmit(queryDatabase)}>
                        <h1>Restablecer contraseña</h1>
                        <Link to="/login">¿Ya recordaste tu contraseña?</Link>
                        <label htmlFor="email">Nueva contraseña:</label>
                        <input id="confirm_password" type="password"/>
                        <label htmlFor="password">Validar contraseña</label>
                        <input id="confirm_password" type="password"/>
                        <input className='submitButton' type='submit' value="Guardar"/>
                    </form>
                </>
            </main>
        </>
    );
}