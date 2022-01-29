import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import img1 from '../assets/Rectangle49.png'
import img2 from '../assets/Rectangle50.png'
import img3 from '../assets/Rectangle52.png'
import img4 from '../assets/Rectangle53.png'
import img5 from '../assets/Rectangle54.png'
import img6 from '../assets/Rectangle55.png'

export const Register = () => {
    const { register, handleSubmit, reset } = useForm();
    const [registerPage, setRegisterPage] = useState('input');

    const interests = [
        {
            imgUrl: img1,
            name: "Ciencia ficción"
        },
        {
            imgUrl: img2,
            name: "Romance"
        },
        {
            imgUrl: img3,
            name: "Novela"
        },
        {
            imgUrl: img4,
            name: "Terror"
        },
        {
            imgUrl: img5,
            name: "Policiaca"
        },
        {
            imgUrl: img6,
            name: "Infantil"
        },
    ];
    const postRegisterData = (data) => {
        /*Conexión con base de datos para guardar lo que haya en data*/


        reset();
        setRegisterPage('input');
    }
    return (
        <main>
            <form onSubmit={handleSubmit(postRegisterData)}>
                {
                    registerPage === 'input' ?
                    <>
                    <h1>Regístrate en HandBook</h1>
                    <input type="mail" {...register("email")} placeholder="Correo electrónico" />
                    <input {...register("name")} placeholder="Nombre completo" />
                    <input {...register("username")} placeholder="Nombre de usuario" />
                    <input type="password" {...register("password")} placeholder="Contraseña" />
                    <input type="password" {...register("passwordConfirmed")} placeholder="Confirmar contraseña" />
                    <br />
                    <button onClick={()=>{setRegisterPage('interests')}}>Continuar</button>
                </>
                :
                <>  
                    <h1>Tus intereses</h1>
                    <ul>
                        {
                            interests.map((interest, index) => {
                                return(
                                    <label key={`interest ${index}`} htmlFor={`interest${index}`}>
                                        <input {...register(`interest${index}`)} id={`interest${index}`} type="checkbox" />
                                        <img src={interest.imgUrl} alt="" />
                                        <h5>{interest.name}</h5>
                                    </label>
                                ) 
                            })
                        }
                    </ul>
                    <button type="submit">Registrarse</button>
                </>
                }
            </form>
        </main>
    );
}