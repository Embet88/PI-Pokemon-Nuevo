import React from "react";
import { Link } from "react-router-dom";
import "./card.css";


// define la carta de los pokemones por los parametros del array e imag
export const Card = ({ array, img }) => {
  return (
    <>
      <div className="container">
        {array.length ? (
          array.map((p) => {
            console.log(p);
            return (
              <Link to={`/pokedex/${p.id}`} key={p.name}>
                <figure className={p.type[0]}>
                  <div className="cardImageContainer">
                    <img src={p.img} alt="" className="CardImage" />
                  </div>
                  <figcaption className="cardCaption">
                    <h1 className="cardName">
                      #{p.idPoke ? `${p.idPoke}H` : p.id}-{p.name}
                    </h1>

                    {p.type.length === 2 ? (
                      <div className="types">
                        <h3 className="cardType">{p.type[0]}</h3>
                        <h3 className="cardType">{p.type[1]}</h3>
                      </div>
                    ) : (
                      <div className="types">
                        <h3 className="cardType">{p.type[0]}</h3>
                      </div>
                    )}
                    <div className="cardCaption">
                      <h4>Fuerza: {p.fuerza}</h4>
                      
                    </div>
                  </figcaption>
                </figure>
              </Link>
            );
          })
        ) : (
          //esta porcion pone una imagen de error si el pokemon no se encuentra
          <img
            src={
              array.info
                ? "https://media.giphy.com/media/pq2pU6B2Ht3pu/giphy.gif"
                : img
            }
            alt="Not found"
          />
        )}
      </div>
    </>
  );
};
