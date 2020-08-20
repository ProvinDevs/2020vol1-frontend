import React, { FC } from "react";

import Header, { HeaderProps } from "../components/common/Header";
import PageContainer from "../components/common/Container";

const headerProps: HeaderProps = {
  role: "生徒",
  href: "/about",
};

const Home: FC = () => (
  <>
    <Header {...headerProps} />
    <PageContainer>
      <h1>This is Home</h1>
    </PageContainer>
  </>
);

export default Home;
