import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link , Redirect, useHistory} from 'react-router-dom';
import { useForm } from "react-hook-form";
import logo from '../../assets/logo.svg'
import { Context } from '../../Context';

export const Recovery = () => {

    const history = useHistory();
    const {setUserAutentication} = useContext(Context);
    const { register, handleSubmit, reset } = useForm();
    const [userLogged, setUserLogged] = useState(false);
    const queryDatabase = async (data) => {
        /*Consulta a la base de datos*/
        try {
    
            const response = await fetch('https://paseraspandoapi.vercel.app/recovery',{
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    email: data.email,
                })
            });
    
            const jsonResponse = await response.json();
            alert(jsonResponse.message);
            history.push('/login')
            
        } catch (error) {
            alert('Usuario o contraseña incorrectos')
            console.error(error)
        }
    }
    
    return (
        <>
            <Helmet>
                <title>Pasé Raspando - Recuperar contraseña</title>
                <meta name="description" content="Recupera tu contraseña" />
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
                        <h1>Recuperar contraseña</h1>
                        <p>¿No tienes una cuenta? <Link to="/">Regístrate</Link></p>
                        <label htmlFor="email">Correo electrónico</label>
                        <input input="email" type="mail" {...register("email")} />
                        <input className='submitButton' type='submit' value="Recuperar"/>
                        <Link to="/login">¿Ya recordaste tu contraseña?</Link>
                        <Link to="/change_password/55">Prueba</Link>
                    </form>
                </>
            </main>
        </>
    );
}