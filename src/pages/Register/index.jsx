import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

import './style.sass'

export const Register = () => {
    const { register, handleSubmit, reset } = useForm();
    const socialNetworks=[
        {
            name: "Facebook"
        },
        {
            name: "Instagram"
        },
        {
            name: "Twitter"
        }
    ];
    const [selectedNetworks, setSelectedNetworks] = useState([{network: "",username: ""}]);
    const [userRegistered, setUserRegistered] = useState(false);
    const [universityInfo, setUniversityInfo] = useState(null);
    const [campus, setCampus] = useState([]);
    const postRegisterData = (data) => {
        /*Conexión con base de datos para guardar lo que haya en data*/
        console.log(data)
        reset();
        setUserRegistered(true);
    }

    const addNetworkToSelected = ()=>{
        const lastSocialNetworkName = document.querySelector('.socialMedia').lastChild.firstChild.value;
        const lastSocialNetworkUsername = document.querySelector('.socialMedia').lastChild.lastChild.value;
        let auxiliarNetworkList = [...selectedNetworks];
        auxiliarNetworkList.unshift({network: lastSocialNetworkName,username: lastSocialNetworkUsername})
        setSelectedNetworks(auxiliarNetworkList);
    }
    useEffect(()=>{
        /*Conexión con la base de datos para traer los programas que se encuentran guardados*/
        setUniversityInfo({
            programs: [
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
            ],
            campus: [
                {
                    name: "Poblado"
                },
                {
                    name: "Apartadó"
                },
                {
                    name: "Rionegro"
                }
            ]
        }
            )
    },[]);
    
    return (
        <main className='singInUpMain'>
            <header>
                <img src="" alt="" />
            </header>
            <section className='hero'>
                <h1>Nombre de la app</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum iste, iusto temporibus vel sapiente architecto dolor expedita est, at ducimus aliquid earum illo minus dolorem.</p>
            </section>
            {
                
                !userRegistered ?
                <form className="registerForm" onSubmit={handleSubmit(postRegisterData)}>
                        <h1>Regístrate ahora</h1>
                        <p>¿Ya tienes una cuenta? <Link to="/login">Ingresa</Link></p>
                        <label htmlFor="fullName">Nombre completo</label>
                        <input id="fullName" {...register("name")} />
                        <label htmlFor="email">Correo electrónico</label>
                        <input input="email" type="mail" {...register("email")} />
                        <label htmlFor="password">Contraseña</label>
                        <input id="password" type="password" {...register("password")}/>
                        <label htmlFor="passwordConfirmed">Confirmar contraseña</label>
                        <input id="passwordConfirmed" type="password" {...register("passwordConfirmed")} />
                        <label>Redes sociales</label>
                        <div className='socialMedia'>
                            {
                                selectedNetworks.map((network,index) =>{
                                    return (
                                    <div className='socialMediaContainer' key={`container${index}`}>                                            
                                        {/* <select {...register(`socialNetwork${index}`)} id='socialMedia' key={`socialNetwork${index}`}>
                                            {
                                                socialNetworks.filter(socialNetwork => selectedNetworks.indexOf(socialNetwork) === -1).map(socialNetwork => <option key={`Social Network ${socialNetwork.name}`}>{socialNetwork.name}</option>)
                                            }
                                        </select> */}
                                        <select {...register(`socialNetworks.${index}.name`)} className='socialMedia' key={`socialNetwork${index}`}>
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
                                <select {...register('universityProgram')} defaultValue={universityInfo.programs[0].name}>
                                    {
                                        universityInfo.programs.map((program, index)=>{
                                            return <option value={program.name} key={`program ${index}`}>{program.name}</option>
                                        })
                                    }
                                </select>
                                <label htmlFor="">Sede</label>
                                <select {...register('campus')} defaultValue={universityInfo.campus[0].name}>
                                    {
                                        universityInfo.campus.map((campus, index)=>{
                                            return <option value={campus.name} key={`campus ${index}`}>{campus.name}</option>
                                        })
                                    }
                                </select>
                            </>
                            :
                            null
                        }
                        <input className="submitButton" type="submit" value='Registrarse'/>
                </form>
                : <Redirect to="/login"/>
            }
        </main>
    );
}