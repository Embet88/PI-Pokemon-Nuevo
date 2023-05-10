import './App.css';
import { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LandingPage } from "./Pages/LandingPage";
import { Pokedex } from "./Pages/Pokedex/Pokedex";
import { Create } from "./Pages/Create/Create";
import { Navbar } from "./components/Navbar/Navbar";
import { getPokemons, getTypes } from "./actions";
import { Pokemon } from "./components/Pokemon/Pokemon";
import { Team } from "./Pages/Team/Team";
import axios from 'axios';
import { useLocation} from "react-router-dom";


axios.defaults.baseURL = "http://localhost:3001";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  });
   // agregamos useLocation para obtener la ruta actual
   const location = useLocation();

   // agregamos una condición para mostrar el Navbar solo si la ruta actual es diferente a la página de LandingPage
   const showNavbar = location.pathname !== "/";
 
  return (
    <>
       {showNavbar && <Navbar />}
      <Route exact path="/pokedex/:id" >
        <Pokemon />
      </Route>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/home">
        <Pokedex />
      </Route>
      <Route exact path="/create">
        <Create />
      </Route>
      <Route exact path="/team">
        <Team />
      </Route>
      
    </>
  );
}

export default App;
