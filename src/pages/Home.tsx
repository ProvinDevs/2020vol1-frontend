import React, { FC } from "react";

import Header, { HeaderProps } from "../components/common/Header";

const headerProps: HeaderProps = {
  role: "生徒",
  href: "/about",
};

const Home: FC = () => (
  <>
    <Header {...headerProps} />
    <h1>This is Home</h1>
  </>
);

export default Home;
