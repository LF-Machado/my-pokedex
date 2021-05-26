function saveFavorites(user, favorites = []) {
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

export default saveFavorites;
