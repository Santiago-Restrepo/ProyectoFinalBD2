import React, { useState, useEffect, useContext} from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Context } from '../../Context';
import { useHistory } from 'react-router-dom';

import logo from '../../assets/logo.svg'
import './style.sass'

const socialNetworks=[
    {
        name: "Facebook"
    },
    {
        name: "Instagram"
    },
    {
        name: "Twitter"
    },
    {
        name: 'Otra'
    }
];
export const Register = () => {
    const history = useHistory();
    const {userAutentication} = useContext(Context);
    if (Object.keys(userAutentication).length !== 0) {
        history.push('/home')
    }
    const { register, handleSubmit, reset } = useForm();
    //Estado para controlar la inserción de nuevas redes
    const [selectedNetworks, setSelectedNetworks] = useState([{network: "",username: ""}]);
    const [userRegistered, setUserRegistered] = useState(false);
    //Estado encargado de controlar la información sobre la universidad traída de la base de datos
    const [universityInfo, setUniversityInfo] = useState(null);
    //Funcion encargada de realizar la inserción de datos de registro en la base de datos
    const postRegisterData = async (data) => {
        /*Conexión con base de datos para guardar lo que haya en data*/
        const response = await fetch('https://paseraspandoapi.vercel.app/new_user',{
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password,
                network: data.socialNetworks,
                program: data.universityProgram,
                sede: data.campus
            })
        })
        reset();
        setUserRegistered(true);
    }

    //Función encargada de añadir una nueva red al formulario
    const addNetworkToSelected = ()=>{
        const lastSocialNetworkName = document.querySelector('.socialMedia').lastChild.firstChild.value;
        const lastSocialNetworkUsername = document.querySelector('.socialMedia').lastChild.lastChild.value;
        let auxiliarNetworkList = [...selectedNetworks];
        auxiliarNetworkList.unshift({network: lastSocialNetworkName,username: lastSocialNetworkUsername})
        setSelectedNetworks(auxiliarNetworkList);
    }
    //Función encargada de cambiar el placeholder dependiendo del valor del select de su izquierda
    const changePlaceholder = (event)=>{
        event.target.value === 'Otra' ? event.target.nextElementSibling.setAttribute('placeholder', 'Url de la red')
        : event.target.nextElementSibling.setAttribute('placeholder', 'Nombre de usuario')
    }
    //Hook de efecto para recibir la información de la base de datos sql
    useEffect(async ()=>{
        /*Conexión con la base de datos para traer los programas que se encuentran guardados*/
        const programsResponse = await fetch('https://paseraspandoapi.vercel.app/programas');
        const jsonPrograms = await programsResponse.json();
        const campusResponse = await fetch('https://paseraspandoapi.vercel.app/sedes')
        const jsonCampus = await campusResponse.json();
        setUniversityInfo({
            programs: jsonPrograms.programs,
            campus: jsonCampus.campus
        }
        )
    },[]);
    
    return (
        <main className='singInUpMain'>
            <header>
                <img src={logo} alt="" />
            </header>
            <section className='hero'>
                <h1>PaséRaspando</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum iste, iusto temporibus vel sapiente architecto dolor expedita est, at ducimus aliquid earum illo minus dolorem.</p>
            </section>
            {
                // Preguntamos si un usuario ya se registró para que si se cumple la condición lo redirigamos al Login
                !userRegistered ?
                <form className="registerForm" onSubmit={handleSubmit(postRegisterData)}>
                        <h1>Regístrate ahora</h1>
                        <p>¿Ya tienes una cuenta? <Link to="/login">Ingresa</Link></p>
                        <label htmlFor="fullName">Nombre completo</label>
                        <input id="fullName" {...register("name")} required/>
                        <label htmlFor="email">Correo electrónico</label>
                        <input input="email" type="mail" {...register("email")} required/>
                        <label htmlFor="password">Contraseña</label>
                        <input id="password" type="password" {...register("password")} required/>
                        <label htmlFor="passwordConfirmed">Confirmar contraseña</label>
                        <input id="passwordConfirmed" type="password" {...register("passwordConfirmed")} required/>
                        <label>Redes sociales</label>
                        <div className='socialMedia'>
                            {
                                selectedNetworks.map((network,index) =>{
                                    return (
                                    <div className='socialMediaContainer' key={`container${index}`}>                                            
                                        <select {...register(`socialNetworks.${index}.name`)} className='socialMedia' key={`socialNetwork${index}`} onChange={(event)=>changePlaceholder(event)} required>
                                            {
                                                socialNetworks.map(socialNetwork => <option key={`Social Network ${socialNetwork.name}`}>{socialNetwork.name}</option>)
                                            }
                                        </select>
                                        <input {...register(`socialNetworks.${index}.userName`)} type="text" placeholder='Nombre de usuario' key={`networkUsername${index}`} defaultValue={network.username} />                                            
                                    </div>)
                                })
                            }
                        </div>
                        <input type="button" className="addNetwork" onClick={()=>{addNetworkToSelected()}} value='Añadir otra red social'/>
                        {
                            universityInfo ?
                            <>
                                <label htmlFor="">Programa académico</label>
                                <select {...register('universityProgram')} required>
                                    {
                                        universityInfo.programs.map((program, index)=>{
                                            return <option value={program.nombre} key={`program ${index}`}>{program.nombre}</option>
                                        })
                                    }
                                </select>
                                <label htmlFor="">Sede</label>
                                <select {...register('campus')} required>
                                    {
                                        universityInfo.campus.map((campus, index)=>{
                                            return <option value={campus.nombre} key={`campus ${index}`}>{campus.nombre}</option>
                                        })
                                    }
                                </select>
                            </>
                            : <h1>Loading...</h1>
                        }
                        <input className="submitButton" type="submit" value='Registrarse'/>
                </form>
                : <Redirect to="/login"/>
            }
        </main>
    );
}