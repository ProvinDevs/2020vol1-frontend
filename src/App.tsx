import React, { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import ClassList from "./pages/teacher/ClassList";
import TeacherHomePage from "./pages/teacher/TeacherHome";
import JoinClass from "./pages/student/JoinClass";
import ClassEditPage from "./pages/ClassEditPage";
import ClassPage from "./pages/student/Class";
import Footer from "./components/common/Footer";
import PageWrapper from "./theme";

import { SampleApiClient } from "./api/impls/sample";
import GCS from "./gcs";

import "./scss/global.scss";
import FileCreatePage from "./pages/FileCreatePage";

const apiClient = new SampleApiClient();
const gcs = new GCS();

const App: FC = () => (
  <BrowserRouter>
    <PageWrapper>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/teacher" component={TeacherHomePage} />
        <Route exact path="/teacher/classlist" render={() => <ClassList api={apiClient} />} />
        <Route path="/student/join" render={() => <JoinClass api={apiClient} />} />
        <Route
          exact
          path="/teacher/class/:id"
          component={() => <ClassEditPage client={apiClient} />}
        />
        <Route
          exact
          path="/student/class/:passphrase"
          component={() => <ClassPage apiClient={apiClient} gcs={gcs} />}
        />
        <Route
          exact
          path="/teacher/class/:id/newFile"
          component={() => <FileCreatePage client={apiClient} />}
        />
      </Switch>
      <Footer />
    </PageWrapper>
  </BrowserRouter>
);

export default App;
