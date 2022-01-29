import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useForm } from "react-hook-form";

export const Register = () => {
    const { register, handleSubmit, reset } = useForm();
    const [userRegistered, setUserRegistered] = useState(false);
    const [univeristyPrograms, setUniversityPrograms] = useState([]);
    const postRegisterData = (data) => {
        /*Conexión con base de datos para guardar lo que haya en data*/
        reset();
        setUserRegistered(true);
    }
    useEffect(()=>{
        /*Conexión con la base de datos para traer los programas que se encuentran guardados*/
        setUniversityPrograms([
            {
                name: "Ingeniería informática"
            },
            {
                name: "Ingeniería Civil"
            },
            {
                name: "Ingeniería de instrumentación y control"
            },
            {
                name: "Comunicación audiovisual"
            },
            {
                name: "Ingeniería informática"
            },
        ])
    },[])
    return (
        <main>
            {
                !userRegistered ?
                <form onSubmit={handleSubmit(postRegisterData)}>
                        <h1>Regístrate en Beordered</h1>
                        <input {...register("name")} placeholder="Nombre completo" />
                        <input type="mail" {...register("email")} placeholder="Correo electrónico" />
                        <select>
                            {console.log(univeristyPrograms)}
                        {
                            univeristyPrograms.length != 0 ?
                            univeristyPrograms.map((program, index)=>{
                                return <option value={program.name} key={`program ${index}`}>{program.name}</option>
                            })
                            :
                            null
                        }
                        </select>
                        <input type="password" {...register("password")} placeholder="Contraseña" />
                        <input type="password" {...register("passwordConfirmed")} placeholder="Confirmar contraseña" />
                        <br />
                        <button type="submit">Registrarse</button>                
                </form>
                : <Redirect to="/login"/>
            }
        </main>
    );
}