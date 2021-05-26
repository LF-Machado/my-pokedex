import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../Components/NavBar";

function Home() {
  const logedIn = localStorage.getItem("logedIn");
  const history = useHistory();

  useEffect(() => {
    if (!logedIn) history.push("/");
  }, []);

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div>
      <div>Home</div>
      <button onClick={logout}>Logout</button>
      <NavBar />
    </div>
  );
}

export default Home;
