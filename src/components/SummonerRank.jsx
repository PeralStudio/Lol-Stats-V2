import React from "react";

import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
import opgg from "../assets/img/opgg.png";
import { validarElo, validarElo2 } from "../functions/ValidarElo";

const SummonerRank = ({ data, summData, name, allLoad }) => {

    let winrateColor = "";

    data && ((data.wins / (data.wins + data.losses)) * 100).toFixed(1) < 50
        ? (winrateColor = "winrate-red")
        : (winrateColor = "winrate-green");

    const dataChart = {
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

    return (
        <div className="container-data">
            <div>
                <h2 className="card-title">
                    {data.summonerName}
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/11.17.1/img/profileicon/${summData.profileIconId}.png`}
                        className={validarElo2(data.tier)}
                        alt="..."
                        style={{
                            width: "4rem",
                            margin: "auto",
                            marginLeft: "5px",
                            borderRadius: "50%",
                        }}
                    />
                </h2>
            </div>
            <img
                src={validarElo(data.tier)}
                className="card-img-top"
                alt="rank"
                style={{ width: "8rem", margin: "auto" }}
            />
            <div className="card-body">
                <h5 className="card-title">
                    <span>
                        Nivel {summData.summonerLevel} -
                        <span className={`${validarElo2(data.tier)}-font`}>
                            {" "}
                            {data.tier} {data.rank}
                        </span>
                    </span>
                </h5>
                <p>LP: {data.leaguePoints}</p>
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
                    <p>{data.queueType}</p>
                </div>
                {/*********** ChartJs **************/}
                {allLoad &&
                    <div className="doughnut">
                        <Doughnut data={dataChart} />
                    </div>
                }
                <Link to={`/histories/${name}`}><button style={{ margin: '20px' }} type="button" className="btn btn-outline-info">Historial</button></Link>

            </div>
            <a
                href={`https://euw.op.gg/summoner/userName=${name}`}
                target="_blank"
                rel="noreferrer"
            >
                <img
                    src={opgg}
                    className="card-img-top"
                    alt="opgg"
                    style={{
                        width: "10rem",
                        margin: "auto",
                        marginBottom: '20px'
                    }}
                />
            </a>
        </div>
    );
};

export default SummonerRank;