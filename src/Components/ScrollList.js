import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [currPage, setCurrPage] = useState(1);
  const [favoritesArray, setFavoritesArray] = useState(
    getFavorites(currUser) || []
  );
  const logedIn = localStorage.getItem("logedIn");

  useEffect(() => {
    const page =
      parseInt(new URLSearchParams(location.search).get("page")) || 1;
    const offset = (page - 1) * limit;
    changePagesArray(page);
    setCurrPage(page);

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
  }, [
    logedIn,
    limit,
    location.search,
    favoritesArray,
    maxPage,
    pagesArray.length,
  ]);

  useEffect(() => {
    saveFavorites(currUser, favoritesArray);
  }, [currUser, favoritesArray]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.search]);

  const changePagesArray = page => {
    const copyLastArray = [...lastArray];
    copyLastArray.splice(0, 1);

    if (page === 1) setPagesArr([1, 2, 3, 4, 5]);
    else if (!copyLastArray.includes(page))
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

  const goToPrev = () => {
    if (pagesArray.includes(1)) {
      history.push(`?page=${1}`);
    } else {
      setPagesArr(pagesArray.map(page => page - 1));
      history.push(`?page=${currPage - 1}`);
    }
  };

  const goToNext = () => {
    if (pagesArray.includes(maxPage)) {
      history.push(`?page=${currPage + 1}`);
    } else {
      setPagesArr(pagesArray.map(page => page + 1));
      history.push(`?page=${currPage + 1}`);
    }
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
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Pagination
        pagesArray={pagesArray}
        handlePageClick={handlePageClick}
        goToFirst={goToFirst}
        goToLast={goToLast}
        maxPage={maxPage}
        currPage={currPage}
        goToPrev={goToPrev}
        goToNext={goToNext}
      />
      <div style={{ margin: "0.5rem" }}> </div>
      <Pokemon
        allPokemon={allPokemon}
        handleClickUnfavorite={handleClickUnfavorite}
        handleClickFavorite={handleClickFavorite}
        goToDetail={goToDetail}
      />
    </div>
  );
}

export default ScrollList;
