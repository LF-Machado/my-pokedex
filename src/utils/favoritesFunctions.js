//Gets list of favorite pokemon for current user from the local storage in ascending order
export function getFavorites(user) {
  const allUsersFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const favoritesArray = allUsersFavorites
    ? allUsersFavorites.filter(userFavorites => userFavorites.user === user)[0]
        ?.favorites
    : [];

  if (!favoritesArray) return favoritesArray;
  favoritesArray.sort((a, b) => a - b);

  return favoritesArray;
}

//Checks if the pokemon rendering at the moment are found in the list of favorite pokemon
//saved in the local storage for the current user
export function checkFavorites(allPokemon, favoritesArray) {
  for (let i = 0; i < allPokemon.length; i++) {
    const id = allPokemon[i].id;
    if (favoritesArray.includes(id)) {
      allPokemon[i].favorite = true;
    }
  }

  return allPokemon;
}

//Saves list of favorites to the local storage for the current user
export function saveFavorites(user, favorites = []) {
  const allUsersFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

  let i = 0;
  let found = false;

  for (i; i < allUsersFavorites.length; i++) {
    if (allUsersFavorites[i].user === user) {
      found = true;
      break;
    }
  }

  if (found) {
    allUsersFavorites[i].favorites = favorites;
  } else {
    allUsersFavorites.push({ user, favorites });
  }

  localStorage.setItem("favorites", JSON.stringify(allUsersFavorites));
}

//Unfavorites a pokemon when user clicks on the favorite button, returns array with modified pokemon and favorites array
export const makeUnfavorite = (target, allPokemon, favoritesArray = []) => {
  const id = parseInt(target.id);
  let i = 0;
  for (i; i < allPokemon.length; i++) if (allPokemon[i].id === id) break;

  allPokemon[i].favorite = false;
  favoritesArray.splice(favoritesArray.indexOf(id), 1);

  return [allPokemon, favoritesArray];
};

//Makes a pokemon favorite when user clicks on the favorite button, returns array with modified pokemon and favorites array
export const makeFavorite = (target, allPokemon, favoritesArray = []) => {
  const id = parseInt(target.id);
  let i = 0;
  for (i; i < allPokemon.length; i++) if (allPokemon[i].id === id) break;

  allPokemon[i].favorite = true;
  favoritesArray.push(id);

  return [allPokemon, favoritesArray];
};
