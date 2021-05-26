import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ScrollList.css";
import getImage from "../utils/getImage";
import Pagination from "./Pagination";
import Pokemon from "./Pokemon";
import { useLocation, useHistory } from "react-router-dom";

function ScrollList() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(20);
  const [pagesArray, setPagesArr] = useState([1, 2, 3, 4, 5]);
  const [maxPage, setMaxPage] = useState(10);
  const [lastArray, setLastArray] = useState([]);
  const logedIn = localStorage.getItem("logedIn");
  let location = useLocation();
  let history = useHistory();

  useEffect(() => {
    const page =
      parseInt(new URLSearchParams(location.search).get("page")) || 1;
    setOffset((page - 1) * limit);
  }, [limit, location.search]);

  useEffect(() => {
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
              const image = getImage(url);
              return image;
            })
          );

          setAllPokemon(detailPokemon);
          setMaxPage(Math.ceil(response.data.count / limit));
          console.log(detailPokemon);
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
  }, [logedIn, offset, limit]);

  const handlePageClick = ({ target }) => {
    const clickedPage = parseInt(target.innerText);
    console.log(clickedPage);
    history.push(`?page=${clickedPage}`);

    if (clickedPage === 1) setPagesArr([1, 2, 3, 4, 5]);
    else if (!lastArray.includes(clickedPage))
      setPagesArr([
        clickedPage - 1,
        clickedPage,
        clickedPage + 1,
        clickedPage + 2,
        clickedPage + 3,
      ]);
    else setPagesArr(lastArray);
  };

  const goToFirst = () => {
    setPagesArr([1, 2, 3, 4, 5]);
    history.push(`?page=${1}`);
  };
  const goToLast = () => {
    setPagesArr(lastArray);
    history.push(`?page=${maxPage}`);
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
      <Pokemon allPokemon={allPokemon} />
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
