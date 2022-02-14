import React from 'react';
import { Helmet } from 'react-helmet';

export const NotFound = () => {

    return (
        <>
            <Helmet>
                    <title>Error 404 - Pasé Raspando</title>
                    <meta name="description" content="Esta página no ha sido encontrada dentro de Pasé Raspando" />
            </Helmet>
            <h1>Error</h1>
        </>
    )
}