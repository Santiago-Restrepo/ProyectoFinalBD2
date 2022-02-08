import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from '../components/Header';
import { HomePlans } from '../components/Home-Plans';
import { Context } from '../Context';


export const Home = () => {
    const history = useHistory();
    const {userAutentication} = useContext(Context);
    if (Object.keys(userAutentication).length === 0) {
        history.push('/login')
    }
    return (   
            Object.keys(userAutentication).length !== 0 &&    
            <>
                <Header />
                <HomePlans />
            </>
    );
}