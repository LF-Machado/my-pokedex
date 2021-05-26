function checkFavorites(allPokemon, favoritesArray) {
  for (let i = 0; i < allPokemon.length; i++) {
    const id = allPokemon[i].id;
    if (favoritesArray.includes(id)) {
      allPokemon[i].favorite = true;
    }
  }

  return allPokemon;
}

export default checkFavorites;
