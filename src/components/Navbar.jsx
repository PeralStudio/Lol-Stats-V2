import React from "react";
import { Link } from "react-router-dom";

import logoNavbar from "../assets/img/logonavbar.png";

const Navbar = ({ setSummData, setData, setName, setHistoryGames, setAllLoad, setError }) => {
    return (
        <nav className="navbar" style={{ backgroundColor: "#0B151C" }}>
            <div className="container justify-content-center">
                <Link to={`/`}>
                    <img
                        href="/"
                        src={logoNavbar}
                        alt="logo"
                        onClick={() => {
                            setSummData("");
                            setData("");
                            setName("");
                            setHistoryGames("");
                            setAllLoad(false);
                            setError(false)
                        }}
                        style={{
                            width: "210px",
                            height: "60px",
                            cursor: "pointer",
                        }}
                    />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
