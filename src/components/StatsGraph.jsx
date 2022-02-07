import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

// import { Bar } from "react-chartjs-2";
import Chart from "react-apexcharts";
import ReactTooltip from 'react-tooltip';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'


const StatsGraph = ({ name, getDataPlayer, setAllLoad }) => {

    const [history2, setHistory2] = useState();
    const [version, setVersion] = useState('');
    const { id } = useParams();

    const getDataPlayerMacth = async (matchId) => {
        const res = await axios.get(
            `https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_${matchId}?api_key=${process.env.REACT_APP_API_RIOT}`
        );
        setHistory2(res.data.info);
    };

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

    useEffect(() => getDataPlayerMacth(id), []);

    // if (history === "") window.location.href = "/";

    const colorWinLose = (index) => history2.participants[index].win === true ? "green" : "red";

    const meBorder = (index) => history2.participants[index].summonerName.toLowerCase() == name & history2.participants[index].win == true ? '2px dotted #64af7e' : history2.participants[index].summonerName.toLowerCase() == name & history2.participants[index].win == false ? '2px dotted #ee5952' : '';

    const champUpperCase = (index) => {
        let champLowerCase = history2.participants[index].championName.toLowerCase();
        return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champLowerCase[0].toUpperCase()}${champLowerCase.slice(1)}.png`;
    };

    let totalDamageDealtToChampions = [];
    let totalDamageTaken = [];
    let championName = [];
    // let totalHeal = [];
    let playerName = [];
    // let championNameChart = [];


    const damages = () => {
        for (let historial of history2.participants) {
            totalDamageDealtToChampions.push(historial.totalDamageDealtToChampions);
            totalDamageTaken.push(historial.totalDamageTaken);
            championName.push(historial.championName);
            // totalHeal.push(damageDealt.totalHeal);
            playerName.push(historial.summonerName)
            // championNameChart.push(historial.championName + ` (${historial.summonerName})`);
        }
    }

    history2 && damages();

    const horizontalBar = {
        series: [{
            name: 'Daño Realizado',
            data: totalDamageDealtToChampions
        }, {
            name: 'Daño Recibido',
            data: totalDamageTaken
        }, /* {
            name: 'Curación realizada',
            data: totalHeal
        } */],
        options: {
            chart: {
                type: 'bar',
                width: "100%",
                height: 380,
                toolbar: {
                    show: true,
                    tools: {
                        download: true
                    }
                }
            },
            plotOptions: {
                enabled: false,
                bar: {
                    barHeight: '100%',
                    distributed: true,
                    horizontal: true,
                    dataLabels: {
                        position: 'bottom'
                    },
                }
            },
            dataLabels: {
                enabled: false,
                offsetX: -6,
                style: {
                    colors: ['#fff']
                },
                formatter: function (val, opt) {
                    return val
                },
                dropShadow: {
                    enabled: false
                }
            },
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            xaxis: {
                categories: /* playerName, */ /* championNameChart */ championName,
                labels: {
                    show: true,
                    style: {
                        colors: '#fff'
                    }
                },
            },
            yaxis: {
                labels: {
                    show: true,
                    style: {
                        colors: '#fff'
                    }
                },

            },
            // title: {
            //     text: `${history2.gameMode}`,
            //     align: 'center',
            //     floating: true,
            //     style: {
            //         fontSize: '22px',
            //         fontWeight: 'bold',
            //         color: '#ffffff',
            //     }
            // },
            // subtitle: {
            //     text: `ID: ${history2.gameId}`,
            //     align: 'center',
            //     style: {
            //         fontSize: '12px',
            //         color: '#ffffff',
            //     }
            // },
            tooltip: {
                shared: true,
                intersect: false,
                theme: 'dark',
                x: {
                    show: true
                },
                y: {
                    title: ''
                }
            },
            responsive: [
                {
                    breakpoint: 1000,
                    options: {
                        plotOptions: {
                            bar: {
                                horizontal: false
                            }
                        }
                    }
                }
            ],
        }
    };

    return (
        <>
            {history2 ?
                <>
                    <div>
                        <Link to={`/history/${id}`}>
                            <button style={{ margin: '20px' }} type="button" className="btn btn-outline-info">
                                <FontAwesomeIcon icon={faChevronLeft} />
                                {' '}Volver
                            </button>
                        </Link>
                        <h1>{history2 && history2.gameMode}</h1>
                        <p style={{ fontSize: '12px' }}>Id: {history2 && history2.gameId}</p>
                        <div>
                            {championName.map((champion, index) => (
                                <>
                                    <div
                                        key={index}
                                        style={{ display: 'inline-flex' }}
                                    >
                                        <div>
                                            <Link to='/' onClick={() => {
                                                getDataPlayer(playerName[index]);
                                                setAllLoad(false)
                                            }} >
                                                < img
                                                    src={champion ===
                                                        "FiddleSticks"
                                                        ? champUpperCase(
                                                            index
                                                        )
                                                        : `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion}.png`}
                                                    className={`champ-graph ${colorWinLose(index)}-graph`}
                                                    alt='champ'
                                                    data-tip={playerName[index]}
                                                    style={{ border: `${meBorder(index)}` }}
                                                />
                                                <ReactTooltip place="top" effect='solid' />
                                            </Link>
                                            {/* <p style={{ fontSize: '12px' }}>{history2.participants[index].summonerName}</p> */}
                                        </div>
                                    </div>
                                    {index >= 4 & index <= 4 ? <br /> : null}
                                </>
                            ))}
                        </div>
                    </div>
                    <div className='chart'>
                        <Chart
                            options={horizontalBar.options}
                            series={horizontalBar.series}
                            type="bar"
                        />
                    </div>
                </>
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
    )
}

export default StatsGraph