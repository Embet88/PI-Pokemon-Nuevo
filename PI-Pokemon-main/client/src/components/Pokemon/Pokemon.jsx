import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import style from "./pokemon.module.css";
import Stats from "../Stats";
import axios from "axios";

export const Pokemon = () => {
  const { id } = useParams();
  const history = useHistory();

  const [pokemon, setPokemon] = useState({});
  // en esta funcion se usa para guardar las cartas de los pokes en team
  const addTeam = (obj) => {
    let array = [];
    if (localStorage.getItem("team")) {
      array = localStorage.getItem("team");
      array = JSON.parse(array);
      if (array.length >= 6) array.shift();
      array.push(obj);
      localStorage.setItem("team", JSON.stringify(array));
    } else {
      array.push(obj);
      localStorage.setItem("team", JSON.stringify(array));
    }
    history.push("/team");
  };
  // se obtienen los detalles de los pokes de la api
  useEffect(() => {
    detalles();
  }, []);

  const detalles = async () => {
    const data = await axios.get(`/pokemons/${id}`);

    const pokemon = data.data;
    setPokemon(pokemon);
  };

  // remover un pokemon del team a traves de detalles
  const removeFromTeam = (id) => {
    let array = [];
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas borrar el Pokemon equipo?"
    );
    if (confirmacion) {
      if (localStorage.getItem("team")) {
        array = localStorage.getItem("team");
        array = JSON.parse(array);
        array = array.filter((pokemon) => pokemon.id !== id);
        localStorage.setItem("team", JSON.stringify(array));
      }
    }
  };

  return (
    <>
      {/* en esta seccion si se hace click en la pokebola se guarda el poke en team */}
      <div className={style.container}>
        <h1>{pokemon.name}</h1>
        <h2>#{pokemon.id}</h2>

        <div class={style.pokebola}>
          <p>Agregar al Equipo</p>
          <button
            onClick={() => {
              addTeam({
                id: pokemon.id,
                name: pokemon.name,
                type: pokemon.type,
                img: pokemon.img,
              });
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png"
              alt=""
            />
          </button>
          <div class={style.pokebola}>
            <p>Eliminar del Equipo</p>
            <button onClick={() => removeFromTeam(pokemon.id)}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png"
                alt=""
              />
            </button>
          </div>
        </div>

        <div className={style.ima}>
          <div className={style.imagenfondo}>
            <img src={pokemon.img} alt="" />
            <div className={style.meter2}>
              <div className={style.type}>
                {pokemon.type
                  ? pokemon?.type.map((t) => (
                      <h3 className={style[`${t}`]}>{t}</h3>
                    ))
                  : null}
              </div>
            </div>
          </div>
          {/* en esta porcion de codigo se muetra los stats del pokemon mas el peso y la altura */}
          <div className={style.parrafo}>
            <p>peso: {pokemon.weight}kg</p>
            <p>altura: {pokemon.height}ft</p>
          </div>
          <div className={style.meter}>
            <div className={style.stats}>
              <Stats valor={pokemon.vida} nombre={"HP"} />
            </div>
            <div className={style.stats}>
              <Stats valor={pokemon.fuerza} nombre={"Fuerza"} />
            </div>
            <div className={style.stats}>
              <Stats valor={pokemon.defensa} nombre={"Defensa"} />
            </div>
            <div className={style.stats}>
              <Stats valor={pokemon.velocidad} nombre={"Velocidad"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
