import axios from 'axios';

export const getTypes = () => async (dispatch) => {
  const response = await axios.get("/types");
  console.log(response);
  const data = response.data;
  console.log(data);
  dispatch({
    type: "GET_TYPE",
    payload: data,
  });
};

export const getPokemons = () => async (dispatch) => {
  const response = await axios.get(`/pokemons`);
  const data =  response.data;
  dispatch({
    type: "GET_POKEMONS",
    payload: data,
  });
};

export const getByName = (name) => async (dispatch) => {
  const response = await axios.get(
    `/pokemons?name=${name}`
  );
  const data = response.data;
  dispatch({
    type: "GET_NAME",
    payload: data,
  });
};

export const filters = (num) => async (dispatch) => {
  const response = await axios.post(
    `/pokemons?by=${num}`
  );
  const data =  response.data;
  dispatch({
    type: "FILTER",
    payload: data,
  });
};

export const type = (type) => (dispatch) => {
  dispatch({
    type: "BY_TYPE",
    payload: type,
  });
};

export const order = (order) => (dispatch) => {
  dispatch({
    type: "ORDER",
    payload: order,
  });
};

export const add = (pokemon) => (dispatch) => {
  dispatch({
    type: "ADD",
    payload: pokemon,
  });
};


