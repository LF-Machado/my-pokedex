import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

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

  return (
    <Button
      className="ml-5 mb-1 mt-1 align-self-end"
      variant="secondary"
      onClick={logout}
    >
      Logout
    </Button>
  );
}

export default Logout;
