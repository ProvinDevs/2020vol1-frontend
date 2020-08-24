import React, { FC, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { SampleApiClient } from "./api/impls/sample";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import JoinClass from "./pages/student/JoinClass";
import Footer from "./components/common/Footer";
import PageWrapper from "./theme";

import "./scss/global.scss";

const App: FC = () => {
  const [api, _] = useState(new SampleApiClient());
  return (
    <BrowserRouter>
      <PageWrapper>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/join" render={() => <JoinClass api={api} />} />
        </Switch>
        <Footer />
      </PageWrapper>
    </BrowserRouter>
  );
};

export default App;
