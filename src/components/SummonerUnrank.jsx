import { Link, useHistory } from "react-router-dom";
import opgg from "../assets/img/opgg.png";
import unranked from "../assets/img/Unranked.png";
import { queueId } from "../dataDragon/queueid";
import { ImgSummUnrank } from "../UI/SummonerUnrankUI";

const SummonerUnrank = ({ name, summData, err, dataLive }) => {

    const historyUrl = useHistory();

    const found = queueId.find(element => element.queueId === dataLive.gameQueueConfigId);

    return (
        <>
            <div className='container-data'>
                <h2 className="card-title">
                    {summData.name}
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/profileicon/${summData.profileIconId}.png`}
                        className="card-img-top circleDiv2"
                        alt="..."
                        style={{
                            width: "4rem",
                            margin: "auto",
                            marginLeft: "20px",
                            borderRadius: "50%",
                        }}
                    />
                </h2>
            </div>
            <ImgSummUnrank
                src={unranked}
                className="card-img-top"
                alt="rank"
            />
            {found &&
                <p
                    onClick={() => {
                        historyUrl.push(`/livegame/${name}`);
                    }}
                    style={{ backgroundColor: '#EE4142', width: 'max-content', margin: 'auto', marginTop: '10px', borderRadius: '5px', padding: '0px 5px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                    En partida - {found && found.description}
                </p>
            }
            <div className="card-body">
                <h4>UNRANKED</h4>
                <h5 className="card-title">
                    Nivel {summData.summonerLevel}
                </h5>
                <div
                    style={{ margin: '20px' }}
                >
                    <Link to={`/histories/${name}`}><button style={{ marginBottom: '20px' }} type="button" className="btn btn-outline-info">Historial</button></Link>
                </div>
                <a
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
                </a>
            </div>
        </>
    )
}

export default SummonerUnrank