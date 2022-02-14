import React from 'react';
import { Helmet } from 'react-helmet';
import { HeaderLogin } from '../components/Header/LoginHeader';
import { NotFoundContent } from '../components/NotFound';

export const NotFound = () => {

    return (
        <>
            <Helmet>
                <title>Error 404</title>
                <meta name="description" content="Esta página no ha sido encontrada dentro de Pasé Raspando" />
            </Helmet>
            <HeaderLogin/>
            <NotFoundContent />
        </>
    )
}