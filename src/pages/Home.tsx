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
      {[...new Array(20)]
        .map(
          () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
        )
        .join("\n")}
    </PageContainer>
  </>
);

export default Home;
