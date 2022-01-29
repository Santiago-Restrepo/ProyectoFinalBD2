import React, { useEffect, useState } from 'react';
import { Link , Redirect} from 'react-router-dom';
import { useForm } from "react-hook-form";

export const Login = () => {
    const { register, handleSubmit, reset } = useForm();
    const [userLogged, setUserLogged] = useState(false);
    const queryDatabase = (data) => {
        /*Consulta a la base de datos*/
        const user = {
            data: '',
            logged: false
        };

        user.logged ? 
        /*Darle un valor al contexto sobre la información del usuario logeado */
        setUserLogged(true)
        :
        reset();
    }
    
    return (
        <main>
            {
                !userLogged ?
                <>
                    <h1>Bienvenido a Handbook</h1>
                    <form onSubmit={handleSubmit(queryDatabase)}>
                        <input {...register("username")} type="text" placeholder='Nombre de usuario'/>
                        <input {...register("password")} type="password" placeholder='Contraseña'/>
                        <button type='submit'>Iniciar sesión</button>
                        <Link to="/">Crear cuenta</Link>
                    </form>
                </>
                : <Redirect to='/home'/>
            }
        </main>
    );
}