import axios from 'axios';
import { champsId } from '../dataDragon/champsId';
import { ImgChampAvatar, PNoMargin } from '../UI/TableHistoriesUi';

const LiveGame = ({ dataLive }) => {

    console.log(dataLive);


    let summonerIds = [];
    let dataSumm = [];
    let dataRankSummoners = [];
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


    // console.log(summonerIds);

    const getDataSummoner = async () => {
        for (let summid of summonerIds) {
            const res = await axios.get(
                `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summid}?api_key=${process.env.REACT_APP_API_RIOT}`
            );
            dataRankSummoners.push(res.data);

            // const res2 = await axios.get(
            //     `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/${a}?api_key=${process.env.REACT_APP_API_RIOT}`
            // );
            // dataSummoners.push(res2.data);
        }
    }


    getDataSummoner();
    // getDataSummonerRank();


    // console.log('a', summonerIds);
    console.log('b', dataRankSummoners);
    // console.log('c', dataSummoners);
    // console.log('d', dataSumm);


    dataSumm.map((data, index) => foundChampId.push(champsId.find(element => element.champId === data.championId)));

    return (
        <>
            <div style={{ marginTop: "1rem" }}>
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
                                                src={foundChampId[index].name != undefined ?
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
        </>
    )
}

export default LiveGame