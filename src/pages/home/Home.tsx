import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AccordionHome } from "../../components/styles/according/AccordionHome";
import { Borda } from "../../components/styles/border/Borda";
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/tokensReduce';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import './Media.css';
import { toast } from 'react-toastify';

export const Home = () => {

    let navigate = useNavigate();

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    useEffect(() => {
        if (token == "") {
            
            toast.error('Usuário precisa estar logado!', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined,
            });

            navigate('/login')
        }
    }, [token])

    return (
        <>
            <section className="section-home">
                <div className="section-home-ecoshop">
                    <div className="ecoshop-logo">
                        <h1 className="ecoshop-h1">
                            <span className="ecoshop-h1-eco"> ECO</span>
                            <span className="ecoshop-h1-shop">SHOP</span></h1>
                        <img src="./img/logoEcoshop.png" alt="" className="ecoshop-img" />
                    </div>
                    <span className="ecoshop-span">
                        E-Commerce de Produtos Sustentáveis
                    </span>
                </div>
            </section>

            <section className="section-home">
                <div className="home-div">
                    <h2 className="home-h2">
                        <span className="home-span">SEJAM BEM VINDOS, SOMOS A </span>
                        <span className='ecoshop-header-eco'>ECO</span>
                        <span className='ecoshop-header-shop'>SHOP!</span>
                    </h2>
                    <p className="home-p"> O e-commerce sustentável mais descolado e moderno que você já viu!
                        Onde, além de comprar, você também poderá vender seus produtos ecológios e sustentáveis!
                    </p>
                    <div className="home-box-button">
                        <Link to='/comprar'>
                            <Button variant="contained" className="button-comprar">COMPRAR</Button>
                        </Link>
                        <Link to='/vender'>
                            <Button variant="contained" className="button-vender">VENDER</Button>
                        </Link>
                    </div>
                </div>
                <Borda />
                <div className="home-div2">
                    <div className="home-div2-box">
                        <h2 className="home-h2">
                            <span className="home-span">O que é a </span>
                            <span className='ecoshop-header-eco'>Eco</span>
                            <span className='ecoshop-header-shop'>Shop?</span>
                        </h2>
                        <p className="home-p2"> Somos um e-commerce sustentável com base na ODS 11 (Objetivo de Desenvolvimento Sustentável) da Nações Unidas, que tem como objetivo tornar as cidades e os assentamentos humanos inclusivos, seguros, resilientes e sustentáveis.
                            O site é voltado para pessoas que queiram contribuir para a melhoria do meio ambiente, da qual o usuário tem a liberdade de vender e comprar produtos recicláveis e sustentáveis de forma autônoma e segura.
                            <br />Nossa missão é estimular os usuários firmarem relações econômicas, sociais e ambientais de forma positiva entre áreas urbanas amenizando em partes os problemas ambientais urbanos.
                        </p>
                        <Link to='/home'>
                            <Button variant="outlined" className="button-sm">Saiba Mais</Button>
                        </Link>
                    </div>
                    <img src="./img/LogoSessao2.png" alt="" className="ecoshop-img-sessao2" />
                </div>
            </section>

            <section className="section-home">
                <div className="home-div">
                    <h2 className="home-h2">
                        <span className="home-span">IMPORTÂNCIA DA SUSTENTABILIDADE 🍃</span>
                    </h2>
                <Borda />
                </div>
                <div className="home-div3">
                    <img src="./img/LogoSessao2.png" alt="" className="ecoshop-img-sessao2" />
                    <div className="home-div3-box">
                        <h2 className="home-h2 padding">
                            <span className="home-span">Tópicos 📌</span>
                            <Link to='/home'>
                                <Button variant="outlined" className="button-sm">Saiba Mais</Button>
                            </Link>
                        </h2>
                        <AccordionHome />
                    </div>
                </div>
            </section>

            <section className="section-home">
            </section>
        </>
    );
}