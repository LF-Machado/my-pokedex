import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ScrollList.css";
import getDetails from "../utils/getDetails";
import Pagination from "./Pagination";
import Pokemon from "./Pokemon";
import { useLocation, useHistory } from "react-router-dom";
import {
  checkFavorites,
  getFavorites,
  saveFavorites,
  makeUnfavorite,
  makeFavorite,
} from "../utils/favoritesFunctions";

function ScrollList() {
  let location = useLocation();
  let history = useHistory();
  const [allPokemon, setAllPokemon] = useState([]);
  const limit = 20;
  const [pagesArray, setPagesArr] = useState([1, 2, 3, 4, 5]);
  const [maxPage, setMaxPage] = useState(10);
  const [lastArray, setLastArray] = useState([]);
  const currUser = localStorage.getItem("user");
  const [favoritesArray, setFavoritesArray] = useState(
    getFavorites(currUser) || []
  );
  const logedIn = localStorage.getItem("logedIn");

  useEffect(() => {
    const page =
      parseInt(new URLSearchParams(location.search).get("page")) || 1;
    const offset = (page - 1) * limit;
    changePagesArray(page);

    if (logedIn) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
          );

          const generalPokemon = response.data.results;
          const allUrl = generalPokemon.map(pokemon => {
            return pokemon.url;
          });
          const detailPokemon = await Promise.all(
            allUrl.map(url => {
              const image = getDetails(url);
              return image;
            })
          );
          const checkedPokemon = checkFavorites(detailPokemon, favoritesArray);
          setAllPokemon(checkedPokemon);
          setMaxPage(Math.ceil(response.data.count / limit));
        } catch (error) {
          alert(error);
        }
      };
      fetchData();

      //Initialize last pages array
      const arr = [];
      let arrayElement = maxPage - pagesArray.length;
      for (let i = 0; i < pagesArray.length; i++) {
        arrayElement += 1;
        arr.push(arrayElement);
      }
      setLastArray(arr);
    }
  }, [logedIn, limit, location.search]);

  useEffect(() => {
    saveFavorites(currUser, favoritesArray);
  }, [currUser, favoritesArray]);

  const changePagesArray = page => {
    if (page === 1) setPagesArr([1, 2, 3, 4, 5]);
    else if (!lastArray.includes(page))
      setPagesArr([page - 1, page, page + 1, page + 2, page + 3]);
    else setPagesArr(lastArray);
  };

  const handlePageClick = ({ target }) => {
    const clickedPage = parseInt(target.innerText);
    history.push(`?page=${clickedPage}`);

    changePagesArray(clickedPage);
  };

  const goToFirst = () => {
    setPagesArr([1, 2, 3, 4, 5]);
    history.push(`?page=${1}`);
  };

  const goToLast = () => {
    setPagesArr(lastArray);
    history.push(`?page=${maxPage}`);
  };

  const handleClickUnfavorite = ({ target }) => {
    const [newPokemon, newFavorites] = makeUnfavorite(
      target,
      allPokemon,
      favoritesArray
    );

    setAllPokemon([...newPokemon]);
    setFavoritesArray([...newFavorites]);
  };

  const handleClickFavorite = ({ target }) => {
    const [newPokemon, newFavorites] = makeFavorite(
      target,
      allPokemon,
      favoritesArray
    );

    setAllPokemon([...newPokemon]);
    setFavoritesArray([...newFavorites]);
  };

  const goToDetail = ({ target }) => {
    const id = parseInt(target.id);
    history.push(`/detail?id=${id}`);
  };

  return (
    <div className="scroll__container">
      <Pagination
        pagesArray={pagesArray}
        handlePageClick={handlePageClick}
        goToFirst={goToFirst}
        goToLast={goToLast}
        maxPage={maxPage}
      />
      <Pokemon
        allPokemon={allPokemon}
        handleClickUnfavorite={handleClickUnfavorite}
        handleClickFavorite={handleClickFavorite}
        goToDetail={goToDetail}
      />
      <Pagination
        pagesArray={pagesArray}
        handlePageClick={handlePageClick}
        goToFirst={goToFirst}
        goToLast={goToLast}
        maxPage={maxPage}
      />
    </div>
  );
}

export default ScrollList;
