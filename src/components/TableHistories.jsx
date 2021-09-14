import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import ReactTooltip from 'react-tooltip';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import minions from '../assets/img/icon_minions.png';
import gold from '../assets/img/icon_gold.png';
import damageDealt from '../assets/img/kills.png';

import {
    ImgChampAvatar,
    ImgDamage,
    PGoldEarned,
    PNoMargin,
    PTable
} from '../UI/TableHistoriesUi';
// import { queueId } from '../queueId/queueid';

const TableHistories = ({ gameOne, gameTwo, gameThree, gameFour, gameFive, name }) => {

    const allGamesArray = [gameOne, gameTwo, gameThree, gameFour, gameFive];

    dayjs.updateLocale('en', {
        relativeTime: {
            future: "en %s",
            past: "%s",
            s: 'hace unos segundos',
            m: "un minuto",
            mm: "hace %d minutos",
            h: "hace una hora",
            hh: "hace %d horas",
            d: "hace un día",
            dd: "hace %d días",
            M: "un mes",
            MM: "hace %d meses",
            y: "un año",
            yy: "hace %d años"
        }
    })

    const summonerSpells = {
        21: 'Barrier',
        1: 'Boost',
        14: 'Dot',
        3: 'Exhaust',
        4: 'Flash',
        6: 'Haste',
        7: 'Heal',
        13: 'Mana',
        30: 'To the King!',
        31: 'Poro Toss',
        32: 'Snowball',
        11: 'Smite',
        39: 'Mark',
        12: 'Teleport',
        54: 'Placeholder'
    }

    const found0 = gameOne && gameOne.participants.find(element => element.summonerName.toLowerCase() === `${name.toLowerCase()}`);
    const found1 = gameTwo && gameTwo.participants.find(element => element.summonerName.toLowerCase() === `${name.toLowerCase()}`);
    const found2 = gameThree && gameThree.participants.find(element => element.summonerName.toLowerCase() === `${name.toLowerCase()}`);
    const found3 = gameFour && gameFour.participants.find(element => element.summonerName.toLowerCase() === `${name.toLowerCase()}`);
    const found4 = gameFive && gameFive.participants.find(element => element.summonerName.toLowerCase() === `${name.toLowerCase()}`);


    // Game Duration & Date play
    //
    const dateObject0 = new Date(gameOne && gameOne.gameDuration);
    // const hours = dateObject.getHours();
    const minutes0 = dateObject0.getMinutes();
    const seconds0 = dateObject0.getSeconds();
    const timeString0 = `${minutes0 < 10 ? `0${minutes0}` : minutes0}m ${seconds0 < 10 ? `0${seconds0}` : seconds0}s`;

    const dateObject1 = new Date(gameTwo && gameTwo.gameDuration);
    // const hours = dateObject.getHours();
    const minutes1 = dateObject1.getMinutes();
    const seconds1 = dateObject1.getSeconds();
    const timeString1 = `${minutes1 < 10 ? `0${minutes1}` : minutes1}m ${seconds1 < 10 ? `0${seconds1}` : seconds1}s`;

    const dateObject2 = new Date(gameThree && gameThree.gameDuration);
    // const hours = dateObject.getHours();
    const minutes2 = dateObject2.getMinutes();
    const seconds2 = dateObject2.getSeconds();
    const timeString2 = `${minutes2 < 10 ? `0${minutes2}` : minutes2}m ${seconds2 < 10 ? `0${seconds2}` : seconds2}s`;

    const dateObject3 = new Date(gameFour && gameFour.gameDuration);
    // const hours = dateObject.getHours();
    const minutes3 = dateObject3.getMinutes();
    const seconds3 = dateObject3.getSeconds();
    const timeString3 = `${minutes3 < 10 ? `0${minutes3}` : minutes3}m ${seconds3 < 10 ? `0${seconds3}` : seconds3}s`;

    const dateObject4 = new Date(gameFive && gameFive.gameDuration);
    // const hours = dateObject.getHours();
    const minutes4 = dateObject4.getMinutes();
    const seconds4 = dateObject4.getSeconds();
    const timeString4 = `${minutes4 < 10 ? `0${minutes4}` : minutes4}m ${seconds4 < 10 ? `0${seconds4}` : seconds4}s`;

    //------------------ Sacar el tipo de cola de una Game ------------------

    // console.log(gameOne && gameOne.queueId);

    // const foundId0 = queueId.find(element => element.queueId == `${gameOne && gameOne.queueId}`);

    // console.log(foundId0);
    const champUpperCase = (found) => {
        let champLowerCase = found.championName.toLowerCase();
        return `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${champLowerCase[0].toUpperCase()}${champLowerCase.slice(1)}.png`;
    };

    return (
        <>
            {allGamesArray ?
                <>
                    {found0 != undefined & found1 != undefined & found2 != undefined & found3 != undefined & found4 != undefined &&
                        <div>
                            <span>
                                ({(found0.kills + found1.kills + found2.kills + found3.kills + found4.kills) / 5} /
                            </span>
                            <span style={{ color: 'red' }}>
                                {" "}{(found0.deaths + found1.deaths + found2.deaths + found3.deaths + found4.deaths) / 5}
                            </span>
                            <span>
                                {" "}/{" "}{(found0.assists + found1.assists + found2.assists + found3.assists + found4.assists) / 5})
                            </span>
                            {/* <p>
                                {
                                    (((found0.kills + found1.kills + found2.kills + found3.kills + found4.kills) / 5) +
                                        ((found0.assists + found1.assists + found2.assists + found3.assists + found4.assists) / 5) /
                                        ((found0.deaths + found1.deaths + found2.deaths + found3.deaths + found4.deaths) / 5)).toFixed(2)
                                }
                            </p> */}
                        </div>}
                    <div style={{ marginTop: '1rem' }}>
                        <table className="table table-dark table-striped" >
                            <tbody>



                                {gameOne != undefined &&
                                    <>
                                        <tr className={found0.win ? 'green' : 'red'} style={{ border: `1px solid ${found0.win ? 'green' : 'red'}` }}>
                                            <td style={{ borderLeft: `6px solid ${found0.win ? 'green' : 'red'}` }}>
                                                <Link to={`/history/${gameOne && gameOne.gameId}`}>
                                                    {found0 &&
                                                        <ImgChampAvatar
                                                            src={
                                                                found0.championName ===
                                                                    "FiddleSticks"
                                                                    ? champUpperCase(found0)
                                                                    : `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${found0.championName}.png`
                                                            }
                                                            alt='avatar'
                                                        />}
                                                </Link>
                                                {found0 &&
                                                    <div>
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[found0.summoner1Id]}.png`}
                                                            alt="summ1"
                                                            className='summ1'
                                                            data-tip={summonerSpells[found0.summoner1Id]}
                                                        />
                                                        <ReactTooltip place="top" effect='solid' />
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[found0.summoner2Id]}.png`}
                                                            alt="summ2"
                                                            className='summ2'
                                                            data-tip={summonerSpells[found0.summoner2Id]}
                                                        />
                                                        <ReactTooltip place="top" effect='solid' />
                                                    </div>
                                                }
                                            </td>
                                            <td>
                                                <PTable className={found0.win ? 'winrate-green' : 'winrate-red'} >{gameOne && found0.win ? 'VICTORIA' : 'DERROTA'}</PTable>
                                                <PTable>{gameOne && gameOne.gameMode}</PTable>
                                                <p>
                                                    {found0.totalDamageDealtToChampions}
                                                    <ImgDamage
                                                        src={damageDealt}
                                                        alt="damage"
                                                    />
                                                </p>
                                            </td>
                                            <td>
                                                <div>
                                                    {found0.item0 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found0.item0}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found0.item1 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found0.item1}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found0.item2 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found0.item2}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found0.item3 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found0.item3}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found0.item4 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found0.item4}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found0.item5 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found0.item5}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                </div>
                                                <div className='kda-histories'>
                                                    <PNoMargin>
                                                        {`${found0.kills} / ${found0.deaths} / ${found0.assists}`}
                                                    </PNoMargin>
                                                </div>
                                                <PNoMargin>
                                                    {found0.totalMinionsKilled + found0.neutralMinionsKilled}
                                                    <img
                                                        src={minions}
                                                        alt=""
                                                        style={{ width: '0.7rem' }}
                                                    />
                                                </PNoMargin>
                                            </td>
                                            <td>
                                                <PGoldEarned>{found0.goldEarned}<img
                                                    src={gold}
                                                    alt="gold"
                                                    style={{
                                                        width: ".8rem",
                                                        marginLeft: '2px',
                                                        marginBottom: '2px'
                                                    }}
                                                />
                                                </PGoldEarned>
                                                <PTable>{timeString0}</PTable>
                                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{`${dayjs(gameOne.gameCreation).format("DD/MM/YYYY HH:mm")}`}</p> */}
                                                {`${dayjs(gameOne.gameCreation).fromNow()}`}
                                            </td>
                                        </tr>
                                        <br />
                                    </>
                                }


                                {gameTwo != undefined &&
                                    <>
                                        <tr className={found1.win ? 'green' : 'red'} style={{ border: `1px solid ${found1.win ? 'green' : 'red'}` }}>
                                            <td style={{ borderLeft: `6px solid ${found1.win ? 'green' : 'red'}` }}>
                                                <Link to={`/history/${gameTwo && gameTwo.gameId}`}>
                                                    {found1 &&
                                                        <ImgChampAvatar
                                                            src={
                                                                found1.championName ===
                                                                    "FiddleSticks"
                                                                    ? champUpperCase(found1)
                                                                    : `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${found1.championName}.png`
                                                            }
                                                            alt='avatar'
                                                        />}
                                                </Link>
                                                {found1 &&
                                                    <div>
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[found1.summoner1Id]}.png`}
                                                            alt="summ1"
                                                            className='summ1'
                                                            data-tip={summonerSpells[found1.summoner1Id]}
                                                        />
                                                        <ReactTooltip place="top" effect='solid' />
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[found1.summoner2Id]}.png`}
                                                            alt="summ2"
                                                            className='summ2'
                                                            data-tip={summonerSpells[found1.summoner2Id]}
                                                        />
                                                        <ReactTooltip place="top" effect='solid' />
                                                    </div>
                                                }
                                            </td>
                                            <td>
                                                <PTable
                                                    className={found1.win ? 'winrate-green' : 'winrate-red'}
                                                >
                                                    {gameTwo && found1.win ? 'VICTORIA' : 'DERROTA'}
                                                </PTable>
                                                <PTable>{gameTwo && gameTwo.gameMode}</PTable>
                                                <p>
                                                    {found1.totalDamageDealtToChampions}
                                                    <ImgDamage
                                                        src={damageDealt}
                                                        alt="damage"
                                                    />
                                                </p>
                                            </td>
                                            <td>
                                                <div>
                                                    {found1.item0 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found1.item0}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found1.item1 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found1.item1}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found1.item2 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found1.item2}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found1.item3 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found1.item3}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found1.item4 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found1.item4}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found1.item5 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found1.item5}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                </div>
                                                <div>
                                                    <div className='kda-histories'>
                                                        <PNoMargin>
                                                            {`${found1.kills} / ${found1.deaths} / ${found1.assists}`}
                                                        </PNoMargin>
                                                    </div>
                                                    <PNoMargin>
                                                        {found1.totalMinionsKilled + found1.neutralMinionsKilled}
                                                        <img
                                                            src={minions}
                                                            alt=""
                                                            style={{ width: '0.7rem' }}
                                                        />
                                                    </PNoMargin>
                                                </div>
                                            </td>
                                            <td>
                                                <PGoldEarned>{found1.goldEarned}<img
                                                    src={gold}
                                                    alt="gold"
                                                    style={{
                                                        width: ".8rem",
                                                        marginLeft: '2px',
                                                        marginBottom: '2px'
                                                    }}
                                                />
                                                </PGoldEarned>
                                                <p style={{ fontSize: '12px', margin: '0' }}>{timeString1}</p>
                                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{`${dayjs(gameTwo.gameCreation).format("DD/MM/YYYY HH:mm")}`}</p> */}
                                                {`${dayjs(gameTwo.gameCreation).fromNow()}`}
                                            </td>
                                        </tr>
                                        <br />
                                    </>
                                }


                                {gameThree != undefined &&
                                    <>
                                        <tr className={found2.win ? 'green' : 'red'} style={{ border: `1px solid ${found2.win ? 'green' : 'red'}` }}>
                                            <td style={{ borderLeft: `6px solid ${found2.win ? 'green' : 'red'}` }}>
                                                <Link to={`/history/${gameThree && gameThree.gameId}`}>
                                                    {found2 &&
                                                        <ImgChampAvatar
                                                            src={
                                                                found2.championName ===
                                                                    "FiddleSticks"
                                                                    ? champUpperCase(found2)
                                                                    : `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${found2.championName}.png`
                                                            }
                                                            alt='avatar'
                                                        />}
                                                </Link>
                                                {found2 &&
                                                    <div>
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[found2.summoner1Id]}.png`}
                                                            alt="summ1"
                                                            className='summ1'
                                                            data-tip={summonerSpells[found2.summoner1Id]}
                                                        />
                                                        <ReactTooltip place="top" effect='solid' />
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[found2.summoner2Id]}.png`}
                                                            alt="summ2"
                                                            className='summ2'
                                                            data-tip={summonerSpells[found2.summoner2Id]}
                                                        />
                                                        <ReactTooltip place="top" effect='solid' />
                                                    </div>
                                                }
                                            </td>
                                            <td>
                                                <PTable className={found2.win ? 'winrate-green' : 'winrate-red'}>{gameThree && found2.win ? 'VICTORIA' : 'DERROTA'}</PTable>
                                                <PTable>{gameThree && gameThree.gameMode}</PTable>
                                                <p>
                                                    {found2.totalDamageDealtToChampions}
                                                    <ImgDamage
                                                        src={damageDealt}
                                                        alt="damage"
                                                    />
                                                </p>
                                            </td>
                                            <td>
                                                <div>
                                                    {found2.item0 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found2.item0}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found2.item1 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found2.item1}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found2.item2 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found2.item2}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found2.item3 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found2.item3}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found2.item4 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found2.item4}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found2.item5 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found2.item5}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                </div>
                                                <div>
                                                    <div className='kda-histories'>
                                                        <PNoMargin>
                                                            {`${found2.kills} / ${found2.deaths} / ${found2.assists}`}
                                                        </PNoMargin>
                                                    </div>
                                                    <PNoMargin>
                                                        {found2.totalMinionsKilled + found2.neutralMinionsKilled}
                                                        <img
                                                            src={minions}
                                                            alt=""
                                                            style={{ width: '0.7rem' }}
                                                        />
                                                    </PNoMargin>
                                                </div>
                                            </td>
                                            <td>
                                                <PGoldEarned>{found2.goldEarned}<img
                                                    src={gold}
                                                    alt="gold"
                                                    style={{
                                                        width: ".8rem",
                                                        marginLeft: '2px',
                                                        marginBottom: '2px'
                                                    }}
                                                />
                                                </PGoldEarned>
                                                <p style={{ fontSize: '12px', margin: '0' }}>{timeString2}</p>
                                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{`${dayjs(gameThree.gameCreation).format("DD/MM/YYYY HH:mm")}`}</p> */}
                                                {`${dayjs(gameThree.gameCreation).fromNow()}`}
                                            </td>
                                        </tr>
                                        <br />
                                    </>
                                }


                                {gameFour != undefined &&
                                    <>
                                        <tr className={found3.win ? 'green' : 'red'} style={{ border: `1px solid ${found3.win ? 'green' : 'red'}` }}>
                                            <td style={{ borderLeft: `6px solid ${found3.win ? 'green' : 'red'}` }}>
                                                <Link to={`/history/${gameFour && gameFour.gameId}`}>
                                                    {found3 &&
                                                        <ImgChampAvatar
                                                            src={
                                                                found3.championName ===
                                                                    "FiddleSticks"
                                                                    ? champUpperCase(found3)
                                                                    : `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${found3.championName}.png`
                                                            }
                                                            alt='avatar'
                                                        />}
                                                </Link>
                                                {found3 &&
                                                    <div>
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[found3.summoner1Id]}.png`}
                                                            alt="summ1"
                                                            className='summ1'
                                                            data-tip={summonerSpells[found3.summoner1Id]}
                                                        />
                                                        <ReactTooltip place="top" effect='solid' />
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[found3.summoner2Id]}.png`}
                                                            alt="summ2"
                                                            className='summ2'
                                                            data-tip={summonerSpells[found3.summoner2Id]}
                                                        />
                                                        <ReactTooltip place="top" effect='solid' />
                                                    </div>
                                                }
                                            </td>
                                            <td>
                                                <PTable className={found3.win ? 'winrate-green' : 'winrate-red'}>{gameFour && found3.win ? 'VICTORIA' : 'DERROTA'}</PTable>
                                                <PTable>{gameFour && gameFour.gameMode}</PTable>
                                                <p>
                                                    {found3.totalDamageDealtToChampions}
                                                    <ImgDamage
                                                        src={damageDealt}
                                                        alt="damage"
                                                    />
                                                </p>
                                            </td>
                                            <td>
                                                <div>
                                                    {found3.item0 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found3.item0}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found3.item1 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found3.item1}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found3.item2 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found3.item2}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found3.item3 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found3.item3}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found3.item4 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found3.item4}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found3.item5 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found3.item5}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                </div>
                                                <div>
                                                    <div className='kda-histories'>
                                                        <PNoMargin>
                                                            {`${found3.kills} / ${found3.deaths} / ${found3.assists}`}
                                                        </PNoMargin>
                                                    </div>
                                                    <PNoMargin>
                                                        {found3.totalMinionsKilled + found3.neutralMinionsKilled}
                                                        <img
                                                            src={minions}
                                                            alt=""
                                                            style={{ width: '0.7rem' }}
                                                        />
                                                    </PNoMargin>
                                                </div>
                                            </td>
                                            <td>
                                                <PGoldEarned>{found3.goldEarned}<img
                                                    src={gold}
                                                    alt="gold"
                                                    style={{
                                                        width: ".8rem",
                                                        marginLeft: '2px',
                                                        marginBottom: '2px'
                                                    }}
                                                />
                                                </PGoldEarned>
                                                <p style={{ fontSize: '12px', margin: '0' }}>{timeString3}</p>
                                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{`${dayjs(gameFour.gameCreation).format("DD/MM/YYYY HH:mm")}`}</p> */}
                                                {`${dayjs(gameFour.gameCreation).fromNow()}`}
                                            </td>
                                        </tr>
                                        <br />
                                    </>
                                }


                                {gameFive != undefined &&
                                    <>
                                        <tr className={found4.win ? 'green' : 'red'} style={{ border: `1px solid ${found4.win ? 'green' : 'red'}` }}>
                                            <td style={{ borderLeft: `6px solid ${found4.win ? 'green' : 'red'}` }}>
                                                <Link to={`/history/${gameFive && gameFive.gameId}`}>
                                                    {found4 &&
                                                        <ImgChampAvatar
                                                            src={
                                                                found4.championName ===
                                                                    "FiddleSticks"
                                                                    ? champUpperCase(found4)
                                                                    : `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${found4.championName}.png`
                                                            }
                                                            alt='avatar'
                                                        />}
                                                </Link>
                                                {/* <p style={{ fontSize: '.8rem', marginBottom: '0' }}>{found4.championName}</p> */}
                                                {found4 &&
                                                    <div>
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[found4.summoner1Id]}.png`}
                                                            alt="summ1"
                                                            className='summ1'
                                                            data-tip={summonerSpells[found4.summoner1Id]}
                                                        />
                                                        <ReactTooltip place="top" effect='solid' />
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[found4.summoner2Id]}.png`}
                                                            alt="summ2"
                                                            className='summ2'
                                                            data-tip={summonerSpells[found4.summoner2Id]}
                                                        />
                                                        <ReactTooltip place="top" effect='solid' />
                                                    </div>
                                                }
                                            </td>
                                            <td>
                                                <PTable className={found4.win ? 'winrate-green' : 'winrate-red'}>{gameFive && found4.win ? 'VICTORIA' : 'DERROTA'}</PTable>
                                                <PTable>{gameFive && gameFive.gameMode}</PTable>
                                                <p>
                                                    {found4.totalDamageDealtToChampions}
                                                    <ImgDamage
                                                        src={damageDealt}
                                                        alt="damage"
                                                    />
                                                </p>
                                            </td>
                                            <td>
                                                <div>
                                                    {found4.item0 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found4.item0}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found4.item1 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found4.item1}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found4.item2 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found4.item2}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found4.item3 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found4.item3}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found4.item4 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found4.item4}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                    {found4.item5 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found4.item5}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                    />}
                                                </div>
                                                <div>
                                                    <div className='kda-histories'>
                                                        <PNoMargin>
                                                            {`${found4.kills} / ${found4.deaths} / ${found4.assists}`}
                                                        </PNoMargin>
                                                    </div>
                                                    <PNoMargin>
                                                        {found4.totalMinionsKilled + found4.neutralMinionsKilled}
                                                        <img
                                                            src={minions}
                                                            alt=""
                                                            style={{ width: '0.7rem' }}
                                                        />
                                                    </PNoMargin>
                                                </div>
                                            </td>
                                            <td>
                                                <PGoldEarned>{found4.goldEarned}<img
                                                    src={gold}
                                                    alt="gold"
                                                    style={{
                                                        width: ".8rem",
                                                        marginLeft: '2px',
                                                        marginBottom: '2px'
                                                    }}
                                                />
                                                </PGoldEarned>
                                                <p style={{ fontSize: '12px', margin: '0' }}>{timeString4}</p>
                                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{`${dayjs(gameFive.gameCreation).format("DD/MM/YYYY HH:mm")}`}</p> */}
                                                {`${dayjs(gameFive.gameCreation).fromNow()}`}
                                            </td>
                                        </tr>
                                        <br />
                                    </>
                                }


                            </tbody>
                        </table>
                    </div>
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

export default TableHistories