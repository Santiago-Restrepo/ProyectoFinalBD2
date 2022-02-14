import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
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
            <Helmet>
                <title>Pasé Raspando</title>
                <meta name="description" content="No te vuelvas a preocupar por llevar el control de tus notas, Pasé Raspando lo hace por ti" />
            </Helmet>
            <Header />
            <HomePlans />
        </>
    );
}