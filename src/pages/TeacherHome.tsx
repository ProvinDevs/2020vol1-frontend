import React, { FC } from "react";

import Header, { HeaderProps } from "../components/common/Header";
import PageContainer from "../components/common/Container";

const headerProps: HeaderProps = {
  role: "生徒",
  href: "/about",
};

const TeacherHomePage: FC = () => (
  <>
    <Header {...headerProps} />
    <PageContainer>
      <h1>教師の方!2.5次元黒板へようこそ!</h1>
      <p>
        授業一覧は<a href="./teacher/classList">こちら</a>から
      </p>
    </PageContainer>
  </>
);

export default TeacherHomePage;
