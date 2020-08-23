import React, { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import JoinClass from "./pages/student/JoinClass";
import PageWrapper from "./theme";

import "./scss/global.scss";

const App: FC = () => (
  <BrowserRouter>
    <PageWrapper>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/join" component={JoinClass} />
      </Switch>
    </PageWrapper>
  </BrowserRouter>
);

export default App;
