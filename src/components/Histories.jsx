import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { validarElo2 } from '../functions/ValidarElo';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import TableHistories from './TableHistories';
// import ArregloTableIntento from './TableHistories';

const Histories = ({ historyGames, summData, data }) => {

    const { name } = useParams();
    const [gamesArray, setGamesArray] = useState([]);
    const [version, setVersion] = useState('');

    if (historyGames === "") window.location.href = "/";

    useEffect(() => {
        const versionDataDdragon = async () => {
            try {
                const res = await axios.get(
                    `https://ddragon.leagueoflegends.com/api/versions.json`
                );
                setVersion(res.data[0]);
            } catch (error) {
                console.log(error);
            }
        }
        versionDataDdragon();
    }, []);


    useEffect(async () => {

        let res = [];
        let i = 0;

        for (let gameId of historyGames) {
            res[i] = await axios.get(
                `https://europe.api.riotgames.com/lol/match/v5/matches/${gameId}?api_key=${process.env.REACT_APP_API_RIOT}`
            );
            setGamesArray(gamesArray => [...gamesArray, res[i].data.info]);
            i++
        }
    }, []);


    return (
        <>
            <div>
                <Link to="/">
                    <button
                        type="button"
                        className="btn btn-outline-info button-back"
                    >
                        Perfil
                    </button>
                </Link>
            </div>
            {gamesArray ?
                <>
                    <h1 style={{ fontSize: '2.2rem' }}>Historial</h1>
                    <h3
                        style={{
                            marginTop: '1rem',
                            textTransform: 'capitalize',
                        }}>
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summData.profileIconId}.png`}
                            alt="Icon"
                            className={data ? validarElo2(data.tier) : 'gold'}
                            style={{
                                width: "3rem",
                                marginRight: '.4rem',
                                marginBottom: '.3rem',
                                borderRadius: "50%",
                            }}
                        />
                        {name}
                    </h3>
                    {gamesArray.length >= 10 && <h6 style={{ marginTop: '.8rem' }}>Partidas Recientes (Últimas {gamesArray.length} jugadas)</h6>}
                    {/* <TableHistories
                        gameOne={gameOne}
                        gameTwo={gameTwo}
                        gameThree={gameThree}
                        gameFour={gameFour}
                        gameFive={gameFive}
                        gameSix={gameSix}
                        gameSeven={gameSeven}
                        gameEight={gameEight}
                        gameNine={gameNine}
                        gameTen={gameTen}
                        name={name}
                    /> */}
                    <TableHistories
                        name={name}
                        gamesArray={gamesArray}
                    />
                </>
                :
                <Loader
                    type="TailSpin"
                    color="#00c0b1"
                    height={100}
                    width={100}
                    style={{ marginTop: '100px' }}
                />
            }
        </>
    )
}

export default Histories