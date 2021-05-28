import "./App.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Detail from "./Pages/Detail";
import Favorites from "./Pages/Favorites";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/detail" component={Detail} />
          <Route exact path="/favorites" component={Favorites} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
