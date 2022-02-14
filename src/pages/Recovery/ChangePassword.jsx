import React, {useState} from 'react'; 
import { Helmet } from 'react-helmet';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { HeaderLogin } from '../../components/Header/LoginHeader';
import ImageMain from '../../assets/undraw_authentication_re_svpt 1.png';

export const ChangePassword = () => {

    import('../Register/style.sass');
    let TokenRecovery = location.href.split('=')[1];

    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const [isPasswordShowed, setIsPasswordShowed] = useState(false);
    const togglePassword = (event)=>{
        const passwordInput = event.target.previousElementSibling;
        passwordInput.setAttribute('type', !isPasswordShowed ? 'text' : 'password');
        setIsPasswordShowed(!isPasswordShowed);
    }
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
            <Helmet>
                <title>Pasé Raspando - Restablecer contraseña</title>
                <meta name="description" content="Restablece tu contraseña" />
            </Helmet>
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
                        <div className="password">
                            <input id="password" type="password" {...register("password")} required/>
                            <button type='button' 
                            className={isPasswordShowed ? 'unshowed':'showed'} 
                            onClick={(event)=>{togglePassword(event)}}>
                            </button>
                        </div>
                        <label htmlFor="password">Confirmar nueva contraseña:</label>
                        <div className="password">
                            <input id="confirm_password" type="password" {...register("confirm_password")}/>
                            <button type='button' 
                            className={isPasswordShowed ? 'unshowed':'showed'} 
                            onClick={(event)=>{togglePassword(event)}}>
                            </button>
                        </div>
                        <input className='submitButton' type='submit' value="Restablecer"/>
                    </form>
                </>
            </main>
        </>
    );
}