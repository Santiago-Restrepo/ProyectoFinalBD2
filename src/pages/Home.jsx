import React from 'react';

export const Home = () => {
    return (
        <>
            <header className="header">
                <a href="#" className="header__perfil">
                    <img src="./assets/profile.svg" alt="Perfil"/>
                </a>
                <h1 className="logo">HandBook</h1>
                <a href="#" className="header__notificaciones">
                    <img src="./assets/notification.svg" alt="Notificación"/>
                </a>
            </header>
            <main className="main">
                <section className="searchBook">
                    <input type="text" className="searchBook__input" placeholder="Buscar un libro"/>
                    <figure className="searchBook__icon">
                        <img src="./assets/lens.svg" alt=""/>
                    </figure>
                </section>
                <section className="carousel">
                </section>
                <section className="selections">
                    <button className="selections__button redButton">
                        <img src="./assets/x.svg" alt=""/>
                    </button>
                    <button className="selections__button greenButton">
                        <img src="./assets/heart.svg" alt=""/>
                    </button>
                    <button className="selections__button yellowButton">
                        <img src="./assets/bookmark.svg" alt=""/>
                    </button>
                </section>
            </main>
        </>
    );
}