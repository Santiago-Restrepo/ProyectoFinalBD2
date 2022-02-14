import React from 'react';
import { Helmet } from 'react-helmet';
import { Link , useHistory} from 'react-router-dom';
import { useForm } from "react-hook-form";

import { HeaderLogin } from '../../components/Header/LoginHeader';

/** ALERTS */
import Swal from 'sweetalert2';

// Assets
import logo from '../../assets/logo.svg';
import ImageMain from '../../assets/undraw_forgot_password_re_hxwm 1.png';

export const Recovery = () => {

    import('../Register/style.sass');

    const history = useHistory();
    const { register, handleSubmit } = useForm();
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
            history.push('/login')
            
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

    return (
        <>
            <Helmet>
                <title>Pasé Raspando - Recuperar contraseña</title>
                <meta name="description" content="Recupera tu contraseña" />
            </Helmet>
            <HeaderLogin />
            <main className='singInUpMain'>
                <section className='hero'>
                    <h1>Pasé Raspando  📝</h1>
                    <p>¡No te preocupes, solo revisa tu correo!</p>
                    <img src={ImageMain} alt="Imagen alusiva a la recuperación de contraseñas" />
                </section>
                <>
                    <form className="registerForm" onSubmit={handleSubmit(queryDatabase)}>
                        <h1>Recuperar contraseña</h1>
                        <p>¿No tienes una cuenta? <Link to="/">Regístrate</Link></p>
                        <label htmlFor="email">Correo electrónico</label>
                        <input input="email" type="mail" {...register("email")} />
                        <input className='submitButton' type='submit' value="Recuperar"/>
                    </form>
                </>
            </main>
        </>
    );
}