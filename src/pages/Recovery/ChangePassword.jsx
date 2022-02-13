import React from 'react'; 
import { useHistory, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { HeaderLogin } from '../../components/Header/LoginHeader';
import ImageMain from '../../assets/undraw_authentication_re_svpt 1.png';

export const ChangePassword = () => {

    import('./styles.sass');
    let TokenRecovery = location.href.split('=')[1];

    const history = useHistory();
    const { register, handleSubmit } = useForm();

    const queryDatabase = async (data) => {

        console.log(data);

        /* Consulta a la base de datos */
        try {
            const response = await fetch('https://paseraspandoapi.vercel.app/change-password',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${TokenRecovery}`
                },
                method: 'POST',
                body: JSON.stringify({
                    newPassword: data.password
                })
            });
            
            const jsonResponse = await response.json();         
            history.push('/login');
            
        } catch (error) {
            alert('Usuario o contraseña incorrectos');
            console.error(error);
        }
    }
    
    return (
        <>
            <HeaderLogin />
            <main className='singInUpMain'>
                <section className='hero'>
                    <h1>Pasé Raspando  📝</h1>
                    <p>¡Que tu contraseña sea bien segura!</p>
                    <img src={ImageMain} alt="Imagen alusiva a restablecer contraseña" />
                </section>
                <>
                    <form className="registerForm" onSubmit={handleSubmit(queryDatabase)}>
                        <h1>Restablecer contraseña</h1>
                        <Link to="/login">Iniciar sesión</Link>
                        <label htmlFor="email">Nueva contraseña:</label>
                        <input id="password" type="password" {...register("password")}/>
                        <label htmlFor="password">Confirmar nueva contraseña:</label>
                        <input id="confirm_password" type="password" {...register("confirm_password")}/>
                        <input className='submitButton' type='submit' value="Restablecer"/>
                    </form>
                </>
            </main>
        </>
    );
}