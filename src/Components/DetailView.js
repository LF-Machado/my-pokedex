import React, { useEffect, useState } from "react";
import getDetails from "../utils/getDetails";
import { useLocation, useHistory } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import {
  checkFavorites,
  getFavorites,
  saveFavorites,
  makeUnfavorite,
  makeFavorite,
} from "../utils/favoritesFunctions";

function DetailView() {
  const [pokeDetails, setPokeDetails] = useState([]);
  const currUser = localStorage.getItem("user");
  const [favoritesArray, setFavoritesArray] = useState(
    getFavorites(currUser) || []
  );
  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    const id = parseInt(new URLSearchParams(location.search).get("id"));
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    async function fetchData() {
      try {
        const details = await getDetails(url);
        const checkedPokemon = checkFavorites([details], favoritesArray);
        setPokeDetails(...checkedPokemon);
      } catch (error) {
        alert(error);
      }
    }

    fetchData();
  }, [location.search]);

  useEffect(() => {
    saveFavorites(currUser, favoritesArray);
  }, [currUser, favoritesArray]);

  const handleClickUnfavorite = ({ target }) => {
    const [newPokemon, newFavorites] = makeUnfavorite(
      target,
      [pokeDetails],
      favoritesArray
    );

    setPokeDetails(...newPokemon);
    setFavoritesArray([...newFavorites]);
  };

  const handleClickFavorite = ({ target }) => {
    const [newPokemon, newFavorites] = makeFavorite(
      target,
      [pokeDetails],
      favoritesArray
    );

    setPokeDetails(...newPokemon);
    setFavoritesArray([...newFavorites]);
  };

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <big>
                                <b>{pokeDetails?.name}</b>
                              </big>
                            </td>
                            <td>
                              <big>#Id</big>
                              <br />
                              <span>{pokeDetails?.id}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <FavoriteButton
                        pokemon={pokeDetails}
                        handleClickUnfavorite={handleClickUnfavorite}
                        handleClickFavorite={handleClickFavorite}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <img
                                src={
                                  pokeDetails?.sprites?.other[
                                    "official-artwork"
                                  ]?.front_default
                                }
                                alt="Official Artwork"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th>Sprites</th>
                          </tr>
                          <tr>
                            <td>
                              <img
                                src={pokeDetails?.sprites?.front_default}
                                alt="Default sprite"
                              />
                              <br />
                              <small>Default</small>
                            </td>
                            <td>
                              <img
                                src={pokeDetails?.sprites?.front_shiny}
                                alt="Shiny sprite"
                              />
                              <br />
                              <small>Shiny</small>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <b>Types</b>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            {pokeDetails?.types?.map((e, i) => {
                              return <td key={i}>{e.type.name}</td>;
                            })}
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
}

export default DetailView;
