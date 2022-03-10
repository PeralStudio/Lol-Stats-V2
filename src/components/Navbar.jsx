import React from "react";
import { Link } from "react-router-dom";

import logoNavbar from "../assets/img/logonavbar.png";
import jhinLogo from "../assets/img/jhin_logo.png";
import teemoLogo from "../assets/img/teemo-logo.png";

const Navbar = ({
    setSummData,
    setData,
    setDataFlex,
    setName,
    setHistoryGames,
    setAllLoad,
    setError,
    setDataLive,
    setErr,
}) => {
    return (
        <nav className="navbar" style={{ backgroundColor: "#0B151C" }}>
            <div className="container justify-content-center">
                <Link
                    to={`/`}
                    onClick={() => {
                        setSummData("");
                        setData("");
                        setDataFlex("");
                        setName("");
                        setHistoryGames("");
                        setAllLoad(false);
                        setError(false);
                        setDataLive("");
                        setErr(false);
                    }}
                >
                    <img
                        src={teemoLogo}
                        alt="logo2"
                        style={{ width: "3.2rem", marginRight: "10px" }}
                        className="icon-logo"
                    />
                    <img
                        href="/"
                        src={logoNavbar}
                        alt="logo"
                        style={{
                            width: "210px",
                            height: "60px",
                            cursor: "pointer",
                        }}
                    />
                    <img
                        src={jhinLogo}
                        alt="logo3"
                        style={{ width: "2.2rem", marginLeft: "10px" }}
                        className="icon-logo2"
                    />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
