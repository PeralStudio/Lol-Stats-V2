import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { Link, useParams, useHistory } from "react-router-dom";

import minions from '../assets/img/icon_minions.png';
import gold from '../assets/img/icon_gold.png';
import damageDealt from '../assets/img/kills.png';
import ReactTooltip from "react-tooltip";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { queueId } from "../dataDragon/queueid";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
    relativeTime: {
        future: "en %s",
        past: "%s",
        s: 'hace unos segundos',
        m: "un minuto",
        mm: "hace %d minutos",
        h: "hace una hora",
        hh: "hace %d horas",
        d: "un dia",
        dd: "hace %d dias",
        M: "un mes",
        MM: "hace %d meses",
        y: "un año",
        yy: "hace %d años"
    }
})


const History = ({ name, data, getDataPlayer, setAllLoad }) => {

    const [history, setHistory] = useState('');
    const { id } = useParams();

    const historyUrl = useHistory()

    useEffect(async () => {
        const res = await axios.get(
            `https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_${id}?api_key=${process.env.REACT_APP_API_RIOT}`
        );
        setHistory(res.data.info);
    }, []);

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

    const colorWinLose = (index) => history.participants[index].win === true ? "green" : "red";

    const yourStats = (index) =>
        (name === history.participants[index].summonerName.toLowerCase()) &
            (history.participants[index].win === true)
            ? " me-win"
            : (name ===
                history.participants[index].summonerName.toLowerCase()) &
                (history.participants[index].win === false)
                ? " me-lose"
                : "";

    const champUpperCase = (index) => {
        let champLowerCase = history.participants[index].championName.toLowerCase();
        return `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${champLowerCase[0].toUpperCase()}${champLowerCase.slice(1)}.png`;
    };

    // Game Duration & Date play
    //
    const dateObject = new Date(history.gameDuration);
    // const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const timeString = `${minutes < 10 ? `0${minutes}` : minutes}m ${seconds < 10 ? `0${seconds}` : seconds}s`;
    const timeInt = minutes;

    const foundQueueId = history && queueId.find(element => element.queueId === history.queueId);

    return (
        <>
            {history ?
                <div>
                    <Link to={`/histories/${name}`}>
                        <button
                            type="button"
                            className="btn btn-outline-info button-back"
                        >
                            Historial
                        </button>
                    </Link>
                    <Link to={`/graphics/${id}`}><button style={{ marginLeft: '10px' }} type="button" className="btn btn-outline-info button-back">Gráfica</button></Link>
                    <div>
                        <div>
                            <h1 className='h1-history'>
                                {foundQueueId.description}
                            </h1>
                            <p style={{ fontSize: '12px' }}>id: {id}</p>
                        </div>
                        <div>
                            <p style={{ margin: '0' }}>{timeString}</p>
                            <span style={{ fontSize: '14px' }}>
                                {`${dayjs(history.gameCreation).format("DD/MM/YYYY HH:mm")}`}
                            </span>
                            <p style={{ fontSize: '.9rem' }}>
                                {`${dayjs(history.gameCreation).fromNow()}`}
                            </p>
                        </div>
                    </div>
                    <table className="table table-striped table-dark">
                        <tbody>
                            {history &&
                                history.participants.map((participants, index) => (
                                    <>
                                        <tr
                                            onClick={() => {
                                                historyUrl.push(`/`);
                                                getDataPlayer(participants.summonerName);
                                                setAllLoad(false);
                                            }}
                                            style={{
                                                border: `1px solid ${colorWinLose(index)}`,
                                                cursor: 'pointer'
                                            }}
                                            className={
                                                `${colorWinLose(index)}${yourStats(index)}`
                                            }
                                            data-tip={participants.summonerName}
                                            key={index}
                                        >
                                            <td className='first-td' style={{ borderLeft: `6px solid ${colorWinLose(index)}` }}>
                                                <div>
                                                    <div className={`Level ${colorWinLose(index)}-level`}>
                                                        {participants.champLevel}
                                                    </div>
                                                    <img
                                                        className={
                                                            data &&
                                                            data.tier.toLowerCase()
                                                        }
                                                        src={
                                                            participants.championName ===
                                                                "FiddleSticks"
                                                                ? champUpperCase(
                                                                    index
                                                                )
                                                                : `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${participants.championName}.png`
                                                        }
                                                        alt="Champ"
                                                        data-tip={participants.championName}
                                                    />
                                                    {/* <ReactTooltip place="top" effect='solid' /> */}
                                                    <div style={{ display: 'inline-grid' }}>
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[participants.summoner1Id]}.png`} alt="summ1"
                                                            className='summ1'
                                                            data-tip={summonerSpells[participants.summoner1Id]}
                                                        />
                                                        {/* <ReactTooltip place="top" effect='solid' /> */}
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[participants.summoner2Id]}.png`} alt="summ2"
                                                            className='summ2'
                                                            data-tip={summonerSpells[participants.summoner2Id]}
                                                        />
                                                        {/* <ReactTooltip place="top" effect='solid' /> */}
                                                    </div>
                                                </div>
                                                <span>{participants.summonerName}</span>
                                            </td>
                                            <td className='common-td'>
                                                {`${participants.kills}/${participants.deaths}/${participants.assists}`}
                                                <p style={{
                                                    margin: '0',
                                                    fontSize: '.7rem',
                                                    fontWeight: '100'
                                                }}>
                                                    {((participants.kills + participants.assists) / participants.deaths).toFixed(2)}:1
                                                </p>
                                            </td>
                                            <td className='common-td'>
                                                <div>
                                                    {participants.totalMinionsKilled +
                                                        participants.neutralMinionsKilled}
                                                    <img
                                                        src={minions}
                                                        alt="Champ"
                                                        style={{
                                                            width: ".8rem",
                                                            marginTop: '2px',
                                                            marginLeft: '6px'
                                                        }}
                                                    />
                                                </div>
                                                <p style={{
                                                    margin: '0',
                                                    marginTop: '-5px',
                                                    fontSize: '.7rem',
                                                    textAlign: 'start',
                                                    fontWeight: '100',
                                                }}>
                                                    ({((participants.totalMinionsKilled + participants.neutralMinionsKilled) / timeInt).toFixed(1)})
                                                </p>
                                            </td>
                                            <td className='common-td'>
                                                {participants.totalDamageDealtToChampions}
                                                <img
                                                    src={damageDealt}
                                                    alt="damage"
                                                    style={{
                                                        width: ".8rem",
                                                        marginTop: '-2px'
                                                    }}
                                                />
                                            </td>
                                            <td style={{ verticalAlign: "middle", textAlign: 'end' }}>
                                                <div className='gold-earned'>
                                                    {participants.goldEarned}
                                                    <img
                                                        src={gold}
                                                        alt="gold"
                                                        style={{
                                                            width: ".8rem",
                                                            marginTop: '-2px'
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    {participants.item0 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${participants.item0}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                        style={{
                                                            marginTop: '-2px'
                                                        }}
                                                    />}
                                                    {participants.item1 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${participants.item1}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                        style={{
                                                            marginTop: '-2px'
                                                        }}
                                                    />}
                                                    {participants.item2 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${participants.item2}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                        style={{
                                                            marginTop: '-2px'
                                                        }}
                                                    />}
                                                    {participants.item3 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${participants.item3}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                        style={{
                                                            marginTop: '-2px'
                                                        }}
                                                    />}
                                                    {participants.item4 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${participants.item4}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                        style={{
                                                            marginTop: '-2px'
                                                        }}
                                                    />}
                                                    {participants.item5 !== 0 && <img
                                                        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${participants.item5}.png`}
                                                        alt="item"
                                                        className='img-items'
                                                        style={{
                                                            marginTop: '-2px'
                                                        }}
                                                    />}
                                                </div>
                                            </td>
                                        </tr>
                                        {index >= 4 & index <= 4 ? <br /> : null}
                                        {index >= 9 && <br />}

                                        <ReactTooltip />
                                    </>
                                ))}
                        </tbody>
                    </table >
                </div >
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
    );
};

export default History;