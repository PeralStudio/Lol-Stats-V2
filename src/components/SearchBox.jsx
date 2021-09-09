import React from 'react';

import logoportada from "../assets/img/portada.png";
import { IconDelete } from '../UI/SearchBoxUI';

const SearchBox = ({ data, setName, getDataPlayer, name, summonerNameLS, summData, setSummonerNameLS }) => {

    const savedValue = JSON.parse(localStorage.getItem('SummonerSearch'));

    if (savedValue === null) localStorage.setItem('SummonerSearch', JSON.stringify(''));

    const handleDeleteLS = (nameToDelete) => {
        const arrayFilter = savedValue.filter(element => element !== nameToDelete);
        if (arrayFilter.length > 3) arrayFilter.shift()
        localStorage.setItem('SummonerSearch', JSON.stringify(arrayFilter));
        setSummonerNameLS(arrayFilter);
    }

    const handleSetLS = (name) => {
        setSummonerNameLS([
            ...summonerNameLS,
            name
        ]);
        if (summonerNameLS.length > 3) summonerNameLS.shift();
    }

    return (
        <>
            <div>
                {!summData &&
                    <img
                        src={logoportada}
                        alt="logo"
                        className='logoportada'
                    />
                }
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="wrap">
                        <div className="search">
                            <input
                                type="text"
                                className="searchTerm"
                                id="buscar"
                                name="buscar"
                                value={name}
                                placeholder="Nombre de Invocador"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <button
                                className="searchButton"
                                onClick={() => {
                                    getDataPlayer(name);
                                    handleSetLS(name)
                                }}
                                type="submit"
                            >
                                <i className="fa fa-search" />
                            </button>

                        </div>
                    </div>
                </form>
            </div>
            {
                (!data & !summData & summonerNameLS.length !== 0) ?
                    <>
                        <div>
                            <h5 style={{ marginBottom: '.8rem', marginTop: '1rem' }}>Buscados Recientemente</h5>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {!data & savedValue.length > 0
                                ?
                                <IconDelete onClick={() => handleDeleteLS(summonerNameLS[0])}
                                    className="far fa-trash-alt icon-delete"
                                />
                                :
                                null}
                            {(!data & savedValue.length > 0) ?
                                <p
                                    onClick={(e) => getDataPlayer(summonerNameLS[0])}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btnnoborder"
                                    style={{ marginRight: '15px' }}
                                >
                                    {savedValue.length > 0 && savedValue[0]}
                                </p> : null}
                            {!data & savedValue.length > 1
                                ?
                                <IconDelete
                                    onClick={() => handleDeleteLS(summonerNameLS[1])}
                                    className="far fa-trash-alt icon-delete"
                                />
                                :
                                null}
                            {(!data & savedValue.length > 1) ?
                                <p
                                    onClick={(e) => getDataPlayer(summonerNameLS[1])}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btnnoborder"
                                    style={{ marginRight: '15px' }}
                                >
                                    {savedValue.length > 1 && savedValue[1]}
                                </p> : null}
                            {!data & savedValue.length > 2
                                ?
                                <IconDelete onClick={() => handleDeleteLS(summonerNameLS[2])}
                                    className="far fa-trash-alt icon-delete"
                                />
                                :
                                null}
                            {(!data & savedValue.length > 2) ?
                                <p
                                    onClick={(e) => getDataPlayer(summonerNameLS[2])}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btnnoborder"
                                >
                                    {savedValue.length > 2 && savedValue[2]}
                                </p> : null}
                        </div>
                    </>
                    :
                    null
            }
        </>
    )
}

export default SearchBox