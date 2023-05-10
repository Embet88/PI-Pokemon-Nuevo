import React, { useState } from "react";
import style from "./team.module.css";
import { Card } from "../../components/Cards/Card";

//en esta funcion se guarda un pokemon en el localstorage team
export const Team = () => {
  const [team, setTeam] = useState(() => {
    if (localStorage.getItem("team")) {
      const array = JSON.parse(localStorage.getItem("team"));
      return array;
    }
    return [];
  });
  // en este codigo le pregunta al usuario si desea borrar los pokemones que se encuentran en el localstorage
  const eliminarTeam = () => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas borrar el equipo?"
    );
    if (confirmacion) {
      localStorage.removeItem("team");
      setTeam([]);
    }
  };
  // si el team esta vacio muestra una imagen, si tiene pokes agregados esta el boton para borrar el team
  return (
    <div className={style.container}>
      <Card
        array={team}
        img="https://www.gifsanimados.org/data/media/1446/pokemon-imagen-animada-0095.gif"
      />
      <div className="botones">
        <button onClick={eliminarTeam} className="pages">
          Borrar Team
        </button>
      </div>
    </div>
  );
};
