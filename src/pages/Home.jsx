import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from '../components/Header';
import { HomePlans } from '../components/Home-Plans';
import { Context } from '../Context';

export const Home = () => {
    const history = useHistory();
    const {userAutentication, setUserAutentication} = useContext(Context);
    
    if (Object.keys(userAutentication).length === 0) {
        history.push('/login')
    }
    return (
        <>
            <Header userAutentication={userAutentication}/>
            <HomePlans userAutentication={userAutentication}/>
        </>
    );
}