import React, { useContext } from 'react';
import { Link , useHistory, Redirect } from 'react-router-dom';
import { useForm } from "react-hook-form";
import logo from '../../assets/logo.svg'
import { Context } from '../../Context';

export const Login = () => {

    const history = useHistory();
    const {setUserAutentication, userAutentication} = useContext(Context);

    const { register, handleSubmit, reset } = useForm();
    const postLoginData = async (data) => {
        /*Consulta a la base de datos*/
        try {    
            const response = await fetch('https://paseraspandoapi.vercel.app/login',{
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            });
            const jsonResponse = await response.json();
            localStorage.setItem('userAutentication', JSON.stringify(jsonResponse));
            setUserAutentication(jsonResponse);
            history.push('/home');
        } catch (error) {
            alert('Usuario o contraseña incorrectos')
            console.error(error)
        }
    }
    
    return (
        Object.keys(userAutentication).length === 0 ?
        <main className='singInUpMain'>
            <header>
                <img src={logo} alt="" />
            </header>
            <section className='hero'>
                <h1>PaséRaspando</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum iste, iusto temporibus vel sapiente architecto dolor expedita est, at ducimus aliquid earum illo minus dolorem.</p>
            </section>
                <form className="registerForm" onSubmit={handleSubmit(postLoginData)}>
                    <h1>Ingresa ahora</h1>
                    <p>¿No tienes una cuenta? <Link to="/">Regístrate</Link></p>
                    <label htmlFor="email">Correo electrónico</label>
                    <input input="email" type="mail" {...register("email")} />
                    <label htmlFor="password">Contraseña</label>
                    <input {...register("password")} id="password" type="password"/>
                    <input className='submitButton' type='submit' value="Iniciar sesión"/>
                    <Link to="/">¿No recuerdas tu contraseña?</Link>
                </form>
        </main> : <Redirect to="/home" />
    );
}