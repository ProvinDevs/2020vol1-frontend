import React, { FC, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import ClassList from "./pages/ClassList";
import Footer from "./components/common/Footer";
import PageWrapper from "./theme";

import "./scss/global.scss";
import { SampleApiClient } from "./api/impls/sample";

const App: FC = () => {
  const apiClient = useState(new SampleApiClient())[0];

  return (
    <BrowserRouter>
      <PageWrapper>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route exact path="/classlist" render={() => <ClassList api={apiClient} />} />
        </Switch>
        <Footer />
      </PageWrapper>
    </BrowserRouter>
  );
};

export default App;
