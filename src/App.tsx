import React, { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import TeacherHomePage from "./pages/TeacherHome";
import ClassEditPage from "./pages/ClassDetailPage";
import Footer from "./components/common/Footer";
import PageWrapper from "./theme";

import { SampleApiClient } from "./api/impls/sample";

import "./scss/global.scss";

const apiClient = new SampleApiClient();

const App: FC = () => (
  <BrowserRouter>
    <PageWrapper>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route exact path="/teacher" component={TeacherHomePage} />
        <Route
          exact
          path="/teacher/class/:id"
          component={() => <ClassEditPage client={apiClient} />}
        />
      </Switch>
      <Footer />
    </PageWrapper>
  </BrowserRouter>
);

export default App;
