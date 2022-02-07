import { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Link, useHistory } from "react-router-dom";
import opgg from "../assets/img/opgg.png";
import { validarElo, validarElo2 } from "../functions/ValidarElo";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { queueId } from "../dataDragon/queueid";
import { champsId } from "../dataDragon/champsId"
import { ImgSummUnrank } from "../UI/SummonerUnrankUI";

import { checkLvl, checkMiniCrest } from "../functions/checkLevelBorder";

const SummonerRank = ({ data, dataFlex, summData, name, allLoad, err, dataLive }) => {

    const [version, setVersion] = useState('');
    const historyUrl = useHistory();

    const found = queueId.find(element => element.queueId === dataLive.gameQueueConfigId);
    const found2 = dataLive.gameType == "CUSTOM_GAME" && 'Personalizada';

    // const data = data.find(element => element.queueType === 'RANKED_SOLO_5x5');
    // const foundRankedFlex = data.find(element => element.queueType === 'RANKED_FLEX_SR');

    const foundSummId = dataLive && dataLive.participants.find(element => element.summonerId === data ? data.summonerId : dataFlex.summonerId);
    const foundChampName = foundSummId && champsId.find(element => element.champId === foundSummId.championId);

    let winrateColor = "";

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

    data && ((data.wins / (data.wins + data.losses)) * 100).toFixed(1) < 50
        ? (winrateColor = "winrate-red")
        : (winrateColor = "winrate-green");

    const dataChartSolo = {
        labels: ["Perdidas", "Ganadas"],
        datasets: [
            {
                data: [data && data.losses, data && data.wins],
                backgroundColor: ["#EE5952", "#208ECE"],
                hoverBackgroundColor: ["#EE5952", "#208ECE"],
                borderColor: ["#EE5952", "#208ECE"],
                hoverOffset: 4,
            },
        ],
    };

    const dataChartFlex = {
        labels: ["Perdidas", "Ganadas"],
        datasets: [
            {
                data: [dataFlex && dataFlex.losses, dataFlex && dataFlex.wins],
                backgroundColor: ["#EE5952", "#208ECE"],
                hoverBackgroundColor: ["#EE5952", "#208ECE"],
                borderColor: ["#EE5952", "#208ECE"],
                hoverOffset: 4,
            },
        ],
    };

    const marginOfTier = () => {
        if (data && data.tier === "CHALLENGER") {
            return '80px';
        } else if (data && data.tier === "GRANDMASTER") {
            return '70px';
        } else if (data && data.tier === "MASTER") {
            return '50px';
        } else if (data && data.tier === "DIAMOND") {
            return '30px';
        } else {
            return '0px';
        }
    }

    return (
        <>
            {allLoad ?
                <div className="container-data">
                    <div style={{ marginBottom: marginOfTier() }}>
                        <h2 className="card-title" style={{ marginTop: '30px' }}>
                            {data ? data.summonerName : dataFlex.summonerName} -
                            <span style={{ fontSize: '18px' }}> Nivel {summData.summonerLevel}</span>
                            {/* <img
                                src={checkLvl(summData.summonerLevel)}
                                alt="borderLvl"
                                className="opgg"
                                style={{
                                    position: 'absolute',
                                    width: "4.8rem",
                                    height: "4.8rem",
                                    margin: "auto",
                                    marginTop: "-16px",
                                    zIndex: 1,
                                }} />
                            <img
                                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summData.profileIconId}.png`}
                                className={validarElo2(data.tier)}
                                alt="..."
                                style={{
                                    width: "4rem",
                                    zoom: "0.7",
                                    margin: "auto",
                                    borderRadius: "50%",
                                    marginLeft: "22px",
                                }}
                            /> */}
                        </h2>

                    </div>
                    {data &&
                        <>
                            <div className="container-data-rank" style={{ margin: 'auto' }}>
                                <img
                                    src={validarElo(data ? data.tier : dataFlex.tier)}
                                    className="card-img-top"
                                    alt="rank"
                                    style={{
                                        width: "16rem",
                                        marginTop: '-120px',
                                        marginBottom: '-50px',
                                    }}
                                />
                                <img
                                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summData.profileIconId}.png`}
                                    className={validarElo2(data ? data.tier : dataFlex.tier)}
                                    alt="..."
                                    style={{
                                        position: 'absolute',
                                        width: "6.5rem",
                                        zoom: "0.83",
                                        margin: "auto",
                                        borderRadius: "50%",
                                        marginTop: "42px",
                                        marginLeft: "-205px",
                                    }}
                                />
                            </div>
                            <Link to={`/histories/${name}`}><button style={{ margin: '20px' }} type="button" className="btn btn-outline-info">Historial</button></Link>
                        </>
                    }

                    {!err & !found2 ?
                        <p
                            onClick={() => {
                                historyUrl.push(`/livegame/${name}`);
                            }}
                            style={{ backgroundColor: '#EE4142', width: 'max-content', margin: 'auto', marginTop: '10px', borderRadius: '5px', padding: '0px 5px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            En partida - ({found && found.description}) - {foundChampName && foundChampName.name}{' '}
                            <img
                                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${foundChampName && foundChampName.name}.png`}
                                alt=""
                                style={{ width: '1.5rem', borderRadius: '50%', margin: '1px 2px' }}
                            />
                        </p>
                        :
                        !err & !found ?
                            <p
                                style={{ backgroundColor: '#EE4142', width: 'max-content', margin: 'auto', marginTop: '10px', borderRadius: '5px', padding: '0px 5px', fontSize: '14px', fontWeight: 'bold' }}
                            >
                                En partida - {found2}
                            </p>
                            :
                            null
                    }


                    {data &&
                        <>
                            <div className="card-body" style={{ margin: '10px 0 10px 0', backgroundColor: '#0a1d30', borderRadius: '15px' }}>
                                <h5 className="card-title">
                                    <span>
                                        Ranked Solo -
                                        <span className={`${validarElo2(data.tier)}-font`}>
                                            {" "}
                                            {data.tier} {data.rank}
                                            <img
                                                src={checkMiniCrest(data.tier)}
                                                alt="rank"
                                                style={{ width: '1.8rem', paddingBottom: '2px', marginLeft: '5px' }}
                                            />
                                        </span>
                                    </span>
                                </h5>

                                <p style={{ fontSize: '18px', marginBottom: '5px' }}>
                                    {data ? data.leaguePoints : dataFlex.tier} LP -{' '}
                                    <span style={{ marginBottom: '0', color: "#2DAF7F" }}>
                                        {data ? data.wins : dataFlex.wins}V </span>-
                                    <span style={{ marginBottom: '0', color: "#ee5952" }}>
                                        {data ? data.losses : dataFlex.losses}L
                                    </span>
                                </p>
                                <div className="card-text">
                                    {/* {data && <p style={{ marginBottom: '0' }}>Jugadas: {data.wins + data.losses}</p>} */}
                                    {/* <p style={{ marginBottom: '0' }}>{data.wins}V {data.losses}L</p> */}

                                    <span>Tasa de Victoria </span>
                                    <span className={winrateColor}>
                                        {(
                                            (data.wins / (data.wins + data.losses)) *
                                            100
                                        ).toFixed(1)}
                                        %
                                    </span>
                                    {/* <p>Clasificatoria - {data ? data.queueType : dataFlex.queueType === 'RANKED_SOLO_5x5' ? 'SOLO/DÚO' : '5V5 FLEXIBLE'}</p> */}
                                </div>
                                {/*********** ChartJs **************/}

                                <div className="doughnut">
                                    <Doughnut data={dataChartSolo} />
                                </div>
                            </div>
                        </>
                    }
                    {dataFlex &&
                        <>
                            <div className="container-data-rank" style={{ margin: 'auto' }}>
                                <img
                                    src={validarElo(dataFlex && dataFlex.tier)}
                                    className="card-img-top"
                                    alt="rank"
                                    style={{
                                        width: "16rem",
                                        marginTop: '-120px',
                                        marginBottom: '-50px',
                                    }}
                                />
                                <img
                                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summData.profileIconId}.png`}
                                    className={validarElo2(dataFlex && dataFlex.tier)}
                                    alt="..."
                                    style={{
                                        position: 'absolute',
                                        width: "6.5rem",
                                        zoom: "0.83",
                                        margin: "auto",
                                        borderRadius: "50%",
                                        marginTop: "42px",
                                        marginLeft: "-205px",
                                    }}
                                />
                            </div>
                            {dataFlex && !data &&
                                <Link to={`/histories/${name}`}><button style={{ margin: '20px' }} type="button" className="btn btn-outline-info">Historial</button></Link>}
                            <div className="card-body" style={{ margin: '10px 0 10px 0', backgroundColor: '#0a1d30', borderRadius: '15px' }}>
                                <h5 className="card-title">
                                    <span>
                                        Ranked Flex -
                                        <span className={`${validarElo2(dataFlex.tier)}-font`}>
                                            {" "}
                                            {dataFlex.tier} {dataFlex.rank}
                                            <img
                                                src={checkMiniCrest(dataFlex.tier)}
                                                alt="rank"
                                                style={{ width: '1.8rem', paddingBottom: '2px', marginLeft: '5px' }}
                                            />
                                        </span>
                                    </span>
                                </h5>
                                <p style={{ fontSize: '18px', marginBottom: '5px' }}>
                                    {dataFlex && dataFlex.leaguePoints} LP -{' '}
                                    <span style={{ marginBottom: '0', color: "#2DAF7F" }}>
                                        {dataFlex && dataFlex.wins}V </span>-
                                    <span style={{ marginBottom: '0', color: "#ee5952" }}>
                                        {dataFlex && dataFlex.losses}L
                                    </span>
                                </p>
                                <span>Tasa de Victoria </span>
                                <span className={winrateColor}>
                                    {(
                                        (dataFlex && dataFlex.wins / (dataFlex && dataFlex.wins + dataFlex.losses)) *
                                        100
                                    ).toFixed(1)}
                                    %
                                </span>

                                <div className="doughnut">
                                    <Doughnut data={dataChartFlex} />
                                </div>


                            </div>
                        </>}
                    {/* <a
                        href={`https://euw.op.gg/summoner/userName=${name}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <ImgSummUnrank
                            src={opgg}
                            className="card-img-top"
                            alt="opgg"
                            style={{
                                width: "10rem",
                                margin: "auto",
                                marginBottom: '20px'
                            }}
                        />
                    </a> */}
                </div >
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
        </>
    );
};

export default SummonerRank;