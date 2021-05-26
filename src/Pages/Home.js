import React from "react";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div>
      <div>Home</div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Home;
