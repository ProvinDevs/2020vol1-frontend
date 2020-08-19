import React, { FC } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";

import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import { theme } from "./theme";

import "./scss/global.scss";

const App: FC = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <div>
        <Link to="/">HOME</Link> | <Link to="/about">ABOUT</Link>
      </div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
      </Switch>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
