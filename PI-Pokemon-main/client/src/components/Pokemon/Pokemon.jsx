import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import style from "./pokemon.module.css";
import Stats from "../Stats";
import axios from "axios";

export const Pokemon = () => {
  const { id } = useParams();
  const history = useHistory();

  const [pokemon, setPokemon] = useState({});

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

  useEffect(() => {
    detalles();
  }, []);

  const detalles = async () => {
    const data = await axios.get(`/pokemons/${id}`);

    const pokemon = data.data;
    setPokemon(pokemon);
  };

  return (
    <>
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
        </div>
            
        <div className={style.ima}>
          <div className={style.imagenfondo}><img src={pokemon.img} alt=""/>
          <div className={style.meter2}>
            <div className={style.type}>
            {pokemon.type
              ? pokemon?.type.map((t) => <h3 className={style[`${t}`]}>{t}</h3>)
              : null}
          </div></div>
          
          </div>
          
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
