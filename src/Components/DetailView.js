import React, { useEffect, useState } from "react";
import getDetails from "../utils/getDetails";
import { useLocation, useHistory } from "react-router-dom";

function DetailView() {
  const [pokeDetails, setPokeDetails] = useState([]);
  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    const id = parseInt(new URLSearchParams(location.search).get("id"));
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    async function fetchData() {
      try {
        const details = await getDetails(url);
        console.log(details);
        setPokeDetails(details);
      } catch (error) {
        alert(error);
      }
    }

    fetchData();
  }, [location.search]);

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
                    <td>FAVORITEBUTTON</td>
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
