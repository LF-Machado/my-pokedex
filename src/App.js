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
import { CSSTransition, TransitionGroup } from "react-transition-group";

function App() {
  return (
    <div className="App">
      <Router>
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition key={location.key} timeout={300} classNames="fade">
                <Switch location={location}>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/home" component={Home} />
                  <Route exact path="/detail" component={Detail} />
                  <Route exact path="/favorites" component={Favorites} />
                  <Redirect from="*" to="/" />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </Router>
    </div>
  );
}

export default App;
