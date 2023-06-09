import React, { useState } from "react";
import style from "./search.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getByName, order, type } from "../../actions";

export const Search = () => {
  const dispatch = useDispatch();
  const [pokemons, setPokemons] = useState("");

  const options = useSelector((store) => store.types);
  const button = style.button;

  const handleInputChange = (e) => {
    setPokemons(e.target.value);
  };

  const byTipo = (e) => {
    dispatch(type(e.target.value));
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(getByName(pokemons));
    setPokemons("");
  };

  const orderBy = (e) => {
    dispatch(order(e.target.value));
  };

  return (
    <div className={style.container}>
      <form onSubmit={submit}>
        <div className={style.field}>
          <input
            type="text"
            id="searchterm"
            value={pokemons}
            onChange={handleInputChange}
            placeholder="Escriba el Nombre o ID del ..."
          />
          <input className={button} type="submit" value="Buscar!" />
        </div>
      </form>
      <div className={style.field2}>
        <select className={button} name="Type" onChange={byTipo}>
          <option value="">Tipo:</option>
          {options?.map((p) => (
            <option value={p.name} key={p.slot}>
              {p.name}
            </option>
          ))}
        </select>
        <select name="Ordenar" className={button} onChange={orderBy}>
          <option value="">Ordenar por:</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="fuerza+">Fuerza+</option>
          <option value="fuerza-">Fuerza-</option>
        </select>
      </div>
    </div>
  );
};
