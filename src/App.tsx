import React, { FC, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import JoinClass from "./pages/student/JoinClass";
import TeacherHomePage from "./pages/TeacherHome";
import Footer from "./components/common/Footer";
import PageWrapper from "./theme";

import { SampleApiClient } from "./api/impls/sample";

import "./scss/global.scss";

const App: FC = () => {
  const [api, _] = useState(new SampleApiClient());
  return (
    <BrowserRouter>
      <PageWrapper>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route exact path="/teacher" component={TeacherHomePage} />
          <Route path="/join" render={() => <JoinClass api={api} />} />
        </Switch>
        <Footer />
      </PageWrapper>
    </BrowserRouter>
  );
};

export default App;
