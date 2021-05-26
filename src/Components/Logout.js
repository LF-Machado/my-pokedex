import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Logout() {
  const logedIn = localStorage.getItem("logedIn");
  const history = useHistory();

  useEffect(() => {
    if (!logedIn) history.push("/");
  }, [history, logedIn]);

  const logout = () => {
    localStorage.removeItem("logedIn");
    localStorage.removeItem("user");
    history.push("/");
  };

  return <button onClick={logout}>Logout</button>;
}

export default Logout;
