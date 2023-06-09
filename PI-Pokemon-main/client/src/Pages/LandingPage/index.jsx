import React from "react";
import style from "./landingpage.module.css";
import video from "./video.mp4";
import { Link, useHistory } from "react-router-dom";

export const LandingPage = () => {
  const history = useHistory(); // Obtiene el objeto history

  const handleStartClick = () => {
    history.push("/home"); // Redirige al usuario a la página de inicio
  };

  return (
    <div>
      <div>
        {/* se coloca un video de fondo de la pagina */}
        <video className={style.video} autoPlay loop muted>
          <source src={video} type="video/mp4"></source>
        </video>
        {/* //se hace click en el bton star y se redirige al home de la pagina */}
        <Link to="/home">
          <button className={style.startButton} onClick={handleStartClick}>
            Start
          </button>
        </Link>
      </div>
    </div>
  );
};
