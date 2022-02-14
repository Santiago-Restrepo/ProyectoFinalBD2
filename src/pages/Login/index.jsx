import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { HeaderLogin } from '../../components/Header/LoginHeader';
import { Link , useHistory, Redirect } from 'react-router-dom';
import { useForm } from "react-hook-form";
import logo from '../../assets/logo.svg'
import { Context } from '../../Context';
import { AiFillEye , AiFillEyeInvisible} from 'react-icons/ai';

import loginImage from '../../assets/login.png'

/** ALERTS */
import Swal from 'sweetalert2'

export const Login = () => {
    import('../Register/style.sass')
    const history = useHistory();
    const {setUserAutentication, userAutentication} = useContext(Context);

    const { register, handleSubmit, reset } = useForm();
    //Estado para controlar la visión de la contraseña
    const [isPasswordShowed, setIsPasswordShowed] = useState(false);

    //Función engargada de realizar el inicio de sesión
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
            //Guardamos la información de inicio de sesión en el localStorage y actualizamos el estado para renderizar nuevamente
            localStorage.setItem('userAutentication', JSON.stringify(jsonResponse));
            setUserAutentication(jsonResponse);
            history.push('/home');
        } catch (error) {
            console.error(error);
            /** ERROR */
            let timerInterval
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: 'Usuario o contraseña incorrectos',
                timer: 3000,
                timerProgressBar: true,
                iconColor: '#DC143C',
                confirmButtonColor: '#DC143C',
                confirmButtonText: 'Vale',
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        }
    }
    //Función encargada de cambiar la visión de la contraseña
    const togglePassword = (event)=>{
        const passwordInput = event.target.parentElement.previousElementSibling || event.target.parentElement.parentElement.previousElementSibling;
        passwordInput.setAttribute('type', !isPasswordShowed ? 'text' : 'password');
        setIsPasswordShowed(!isPasswordShowed);
    }
    
    return (
        // Preguntamos si el estado es un objeto vacío
        Object.keys(userAutentication).length === 0 ?
        <>
            <Helmet>
                <title>Pasé Raspando- Inicia sesión</title>
                <meta name="description" content="Inicia sesión en Pasé Raspando" />
            </Helmet>
            <HeaderLogin/>
            <main className='singInUpMain'>
                <section className='hero'>
                    <h1>Pasé Raspando 📝</h1>
                    <p>¡Que bueno volver a verte!</p>
                    <img src={loginImage} alt="Imagen de un hombre entrando por una puerta" />
                </section>
                    <form className="registerForm" onSubmit={handleSubmit(postLoginData)}>
                        <h1>Ingresa ahora</h1>
                        <p>¿No tienes una cuenta? <Link to="/">Regístrate</Link></p>
                        <label htmlFor="email">Correo electrónico</label>
                        <input input="email" type="mail" {...register("email")} required/>
                        <label htmlFor="password">Contraseña</label>
                        <div className="password">
                            <input {...register("password")} id="password" type="password" required/>
                            {isPasswordShowed ?
                            <button type='button' 
                            onClick={(event)=>{togglePassword(event)}}>
                                <AiFillEyeInvisible />   
                            </button>:
                            <button type='button' 
                            onClick={(event)=>{togglePassword(event)}}>
                                <AiFillEye />   
                            </button>
                            }
                        </div>
                        <input className='submitButton' type='submit' value="Iniciar sesión"/>
                        <Link to="/recovery">¿No recuerdas tu contraseña?</Link>
                    </form>
            </main>
        </> : <Redirect to="/home" />
    );
}