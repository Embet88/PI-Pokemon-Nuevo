import React, { useState } from "react";
import style from "./pokedex.module.css";
import { Card } from "../../components/Cards/Card";
import { Search } from "../../components/Search/Search";
import { useSelector } from "react-redux";
import { ordered, tipos } from "../../helpers/filtros";

export const Pokedex = () => {
  let pokemons = useSelector((store) => store.pokemons);
  const type = useSelector((store) => store.type);
  const order = useSelector((store) => store.order);

  if (type) pokemons = tipos(type, pokemons);
  if (order) pokemons = ordered(order, pokemons);

  const [page, setPage] = useState(0);

  //comprueba si la longitud es mayor de 0 y obtiene +9 pokemons por pagina
  const pagination = () => {
    if (pokemons.length) return pokemons.slice(page, page + 9);
    if (pokemons.info) return pokemons;
    return [];
  };

  const array = pagination();
  // si la longitud de pokemones supera los 9 pokemones muestra otros 9 pokes en la siguiente pag
  const nextPage = () => {
    if (pokemons.length > page + 9) {
      setPage(page + 9);
    }
  };
  //si la pagina es mayor a 0 se restaran 9 pokemones mostrando los 9 anteriores
  const previusPage = () => {
    if (page > 0) {
      setPage(page - 9);
    }
  };

  // aqui se puede buscar los pokemones con la barra de busqueda y devolver la carta del poke buscado
  return (
    <div className={style.container}>
      <Search />

      <Card
        array={array}
        img={"https://thumbs.gfycat.com/DampSpanishCleanerwrasse-max-1mb.gif"}
      />
      {/*Aqui se colocan los botones para navegar entre las paginas de la pokedex  */}
      <div className="botones">
        <button onClick={previusPage} className="pages">
          &laquo; Anterior
        </button>
        <button onClick={nextPage} className="pages">
          Siguiente &raquo;
        </button>
      </div>
    </div>
  );
};
