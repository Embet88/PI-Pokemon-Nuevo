import React, { useState } from "react";
import style from "./team.module.css";
import { Card } from "../../components/Cards/Card";

export const Team = () => {
  const [team, setTeam] = useState(() => {
    if (localStorage.getItem("team")) {
      const array = JSON.parse(localStorage.getItem("team"));
      return array;
    }
    return [];
  });

  const eliminarTeam = () => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas borrar el equipo?");
    if (confirmacion) {
      localStorage.removeItem("team");
      setTeam([]);
    }
  };

  return (
    <div className={style.container}>
      <Card array={team} img="https://www.gifsanimados.org/data/media/1446/pokemon-imagen-animada-0095.gif" />
      <div className="botones">
      <button onClick={eliminarTeam} className="pages">Borrar Team</button>
      </div>
      
    </div>
     );
    };