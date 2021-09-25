import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { Link, useHistory, useParams } from "react-router-dom";

import { champsId } from '../dataDragon/champsId';
import { queueId } from '../dataDragon/queueid';

import { ImgChampAvatar, PNoMargin } from '../UI/TableHistoriesUi';
import vsImage from "../assets/img/vs.png";
import bgLoading from "../assets/img/bg-loading-screen.jpg";
import { validarElo, validarElo2 } from '../functions/ValidarElo';
import dayjs from 'dayjs';

const LiveGame = ({ dataLive, getDataPlayer }) => {

    const [dataRankSummoners, setDataRankSummoners] = useState([]);
    const [dataUnrankSummoners, setDataUnrankSummoners] = useState([]);

    const historyUrl = useHistory();
    const { name } = useParams();

    if (dataLive === "") window.location.href = "/";

    dayjs.updateLocale("en", {
        relativeTime: {
            future: " %s",
            past: "%s",
            s: "hace unos segundos",
            m: "un minuto",
            mm: "hace %d minutos",
            h: "hace una hora",
            hh: "hace %d horas",
            d: "hace un día",
            dd: "hace %d días",
            M: "un mes",
            MM: "hace %d meses",
            y: "un año",
            yy: "hace %d años",
        },
    });

    let summonerIds = [];
    let dataSumm = [];
    // let dataRankSummoners = [];
    let dataSummoners = [];
    let foundChampId = [];

    const summonerSpells = {
        21: "Barrier",
        1: "Boost",
        14: "Dot",
        3: "Exhaust",
        4: "Flash",
        6: "Haste",
        7: "Heal",
        13: "Mana",
        30: "To the King!",
        31: "Poro Toss",
        32: "Snowball",
        11: "Smite",
        39: "Mark",
        12: "Teleport",
        54: "Placeholder",
    };

    for (let participant of dataLive.participants) {
        summonerIds.push(participant.summonerId)
        dataSumm.push(participant)
    }

    const summLevel = dataUnrankSummoners.map((element) => element.summonerLevel);
    const found = queueId.find(element => element.queueId === dataLive.gameQueueConfigId);
    const gameStart = dayjs(dataLive.gameStartTime).toNow();


    useEffect(async () => {

        let res = [];
        let res2 = [];
        let i = 0;

        for (let summid of summonerIds) {

            res[i] = await axios.get(
                `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summid}?api_key=${process.env.REACT_APP_API_RIOT}`
            );
            const foundRankedSolo = res[i].data.find(element => element.queueType === 'RANKED_SOLO_5x5');
            setDataRankSummoners(dataRankSummoners => [...dataRankSummoners, foundRankedSolo]);
            i++


            res2[i] = await axios.get(
                `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/${summid}?api_key=${process.env.REACT_APP_API_RIOT}`
            );
            setDataUnrankSummoners(dataUnrankSummoners => [...dataUnrankSummoners, res2[i].data]);
            i++
        }

    }, []);

    const yourStats = (index) => (name === dataLive.participants[index].summonerName.toLowerCase()) ? " me-loading" : "";


    // console.log('a', summonerIds);
    // console.log('b', dataRankSummoners);
    // console.log('c', dataLive);
    // console.log('d', dataSumm);

    dataSumm.map((data, index) => foundChampId.push(champsId.find(element => element.champId === data.championId)));

    return (
        <>
            {/* <div style={{ marginTop: "1rem" }}>
                <table className="table table-dark table-striped">
                    <tbody>
                        {
                            dataSumm.map((data, index) =>
                                <>
                                    <tr
                                        onClick={() => {
                                            historyUrl.push(`/`);
                                            getDataPlayer(participants.summonerName);
                                            setAllLoad(false);
                                        }}
                                        style={{
                                            border: `1px solid ${index >= 0 & index <= 4 ? 'red' : 'green'}`,
                                            backgroundColor: `${index >= 0 & index <= 4 ? '#7219143f' : '#09722e3a'}`
                                        }}>
                                        <td>
                                            <ImgChampAvatar
                                                src={foundChampId[index].name && foundChampId[index].name != undefined ?
                                                    `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${foundChampId[index].name}.png` :
                                                    `https://ddragon.leagueoflegends.com/cdn/11.18.1/img/profileicon/588.png`
                                                }
                                                alt="avatar"
                                            />
                                            <div style={{ display: 'inline-grid' }}>
                                                <img
                                                    src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[data.spell1Id]}.png`}
                                                    alt="summ1"
                                                    className="summ1"
                                                />
                                                <img
                                                    src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[data.spell2Id]}.png`}
                                                    alt="summ1"
                                                    className="summ1"
                                                />
                                            </div>
                                            <PNoMargin>{data.summonerName}</PNoMargin>
                                        </td>
                                    </tr>
                                    {index >= 4 & index <= 4 ? <br /> : null}
                                    {index >= 9 && <br />}
                                </>
                            )

                        }
                    </tbody>
                </table>
            </div >
            <div>
                <h2>{foundQueue.description}- {foundQueue.map}</h2>
            </div> */}

            {dataRankSummoners.length >= 10 ?
                <div style={{ paddingBottom: ".5rem" }}>
                    <Link to={`/`}>
                        <button
                            type="button"
                            className="btn btn-outline-info button-back"
                        >
                            Volver
                        </button>
                    </Link>

                    <h3>{found.description}</h3>
                    <p>Empezó {gameStart}</p>
                    <div style={{ marginTop: ".5rem", display: 'flex', justifyContent: 'center' }}>
                        {dataSumm.map((data, index) =>
                            <>
                                {index <= 4 &&
                                    <div
                                        key={`${index}a`}
                                        onClick={() => {
                                            historyUrl.push(`/`);
                                            getDataPlayer(data.summonerName);
                                        }}
                                        style={{ margin: '5px', cursor: 'pointer' }}
                                        className={dataRankSummoners[index] && dataRankSummoners != undefined ? validarElo2(dataRankSummoners[index].tier) + '-loading' + yourStats(index) : 'unranked1' + yourStats(index)}
                                    >
                                        <img
                                            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${foundChampId[index].name}_0.jpg`}
                                            style={{ width: '8rem' }}
                                        />
                                        <div>
                                            <img
                                                src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/profileicon/${data.profileIconId}.png`}
                                                style={{
                                                    width: "3.5rem",
                                                    borderRadius: "50%",
                                                    marginTop: '-105px'
                                                }}
                                                className='gold'
                                            />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '-15px' }}>
                                            <div>
                                                <img
                                                    src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/spell/Summoner${summonerSpells[data.spell1Id]}.png`}
                                                    alt="summ1"
                                                    // className="summ1"
                                                    style={{ marginRight: '5px', width: '1.5rem' }}
                                                />
                                                <img
                                                    src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/spell/Summoner${summonerSpells[data.spell2Id]}.png`}
                                                    alt="summ1"
                                                    // className="summ1"
                                                    style={{ width: '1.5rem' }}
                                                />
                                            </div>
                                        </div>
                                        <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                                            <span>{data.summonerName}</span>
                                            <PNoMargin style={{ fontSize: '.7rem' }}>
                                                {dataRankSummoners[index] == undefined ? `Nivel ${summLevel[index]}` : `${dataRankSummoners[index].tier} - ${dataRankSummoners[index].rank} (${dataRankSummoners[index].leaguePoints} LP)`}
                                            </PNoMargin>
                                        </div>
                                    </div>}
                            </>
                        )}
                    </div>
                    <div>
                        <img src={vsImage} style={{ width: '4rem' }} />
                    </div>
                    <div style={{ marginTop: ".2rem", display: 'flex', justifyContent: 'center' }}>
                        {dataSumm.map((data, index) =>
                            <>
                                {index >= 5 &&
                                    <div
                                        key={`${index}b`}
                                        onClick={() => {
                                            historyUrl.push(`/`);
                                            getDataPlayer(data.summonerName);
                                        }}
                                        style={{ margin: '5px', cursor: 'pointer' }}
                                        className={dataRankSummoners[index] && dataRankSummoners != undefined ? validarElo2(dataRankSummoners[index].tier) + '-loading' + yourStats(index) : 'unranked2' + yourStats(index)}
                                    >
                                        <img
                                            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${foundChampId[index].name}_0.jpg`}
                                            style={{ width: '8rem' }}
                                        />
                                        <div>
                                            <img
                                                src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/profileicon/${data.profileIconId}.png`}
                                                style={{
                                                    width: "3.5rem",
                                                    borderRadius: "50%",
                                                    marginTop: '-105px'
                                                }}
                                                className='gold'
                                            />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '-15px' }}>
                                            <div>
                                                <img
                                                    src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/spell/Summoner${summonerSpells[data.spell1Id]}.png`}
                                                    alt="summ1"
                                                    // className="summ1"
                                                    style={{ marginRight: '5px', width: '1.5rem' }}
                                                />
                                                <img
                                                    src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/spell/Summoner${summonerSpells[data.spell2Id]}.png`}
                                                    alt="summ1"
                                                    // className="summ1"
                                                    style={{ width: '1.5rem' }}
                                                />
                                            </div>
                                        </div>
                                        <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                                            <span>{data.summonerName}</span>
                                            <PNoMargin style={{ fontSize: '.7rem' }}>
                                                {dataRankSummoners[index] == undefined ? `Nivel ${summLevel[index]}` : `${dataRankSummoners[index].tier} - ${dataRankSummoners[index].rank} (${dataRankSummoners[index].leaguePoints} LP)`}
                                            </PNoMargin>
                                        </div>
                                    </div>}
                            </>
                        )}
                    </div>
                </div>
                :
                <>
                    <Loader
                        type="TailSpin"
                        color="#00c0b1"
                        height={100}
                        width={100}
                        style={{ marginTop: '100px' }}
                    />
                </>
            }
        </>)
}

export default LiveGame