import { Link } from 'react-router-dom';
import '../Error404.css';

import meteor from '../assets/img/meteor2.svg';
import error404 from '../assets/img/404.svg';
import astronaut from '../assets/img/astronaut.svg';
import spaceship from '../assets/img/spaceship.svg';

const Error404 = () => {
    return (
        <>
            <div style={{ userSelect: 'none' }}>
                <div className="mars" />
                <img src={error404} className="logo-404" />
                <img src={meteor} className="meteor" />
                <p className="title">¡¡Oh no!!</p>
                <p className="subtitle">
                    O estás escribiendo mal la URL <br /> o solicitando una página que ya no existe.
                </p>
                <div align="center">
                    <Link to='/'><button type="button" className="btn btn-outline-info">Volver a Casa</button></Link>
                </div>
                <img src={astronaut} className="astronaut" />
                <img src={spaceship} className="spaceship" />
            </div>
        </>
    )
}

export default Error404