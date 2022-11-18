import Home from "./Home";
import Newmessage from "./Newmessage";
import { FC } from "react";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App: FC = () => {
  return (
    <Router>
        <Switch>

          <Route path="/new">
            <Newmessage />
          </Route>

          <Route path="/">
            <Home />
          </Route>

          
        </Switch>
      
    </Router>
  );
};

export default App;
