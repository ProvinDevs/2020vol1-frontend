import React, { FC } from "react";
import { Link, Redirect } from "react-router-dom";

import Header, { HeaderProps } from "../../components/common/Header";
import PageContainer from "../../components/common/Container";

const headerProps: HeaderProps = {
  buttonText: "生徒の方",
  href: "/student/join",
};

const TeacherHomePage: FC = () => (
  <>
    <Header {...headerProps} />
    <PageContainer>
      <Redirect to="/teacher/classlist" />
      <h1>2.5次元黒板へようこそ!</h1>
      <p>
        授業一覧は<Link to="./teacher/classlist">こちら</Link>から
      </p>
    </PageContainer>
  </>
);

export default TeacherHomePage;
