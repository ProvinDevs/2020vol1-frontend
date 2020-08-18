import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import HomePage from "./pages/Home";
import AboutPage from "./pages/About";

const App: React.FC = () => (
  <BrowserRouter>
    <div>
      <Link to="/">HOME</Link> | <Link to="/about">ABOUT</Link>
    </div>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
