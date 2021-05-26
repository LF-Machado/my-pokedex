//get favorites from local storage
function getFavorites(user) {
  const allUsersFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return allUsersFavorites
    ? allUsersFavorites.filter(userFavorites => userFavorites.user === user)[0]
        ?.favorites
    : [];
}

export default getFavorites;
