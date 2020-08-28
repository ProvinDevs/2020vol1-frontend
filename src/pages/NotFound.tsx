import React from "react";
import Header, { HeaderProps } from "../components/common/Header";
import PageContainer from "../components/common/Container";

const headerProps: HeaderProps = {
  buttonText: "ホーム",
  href: "/",
};

const NotFoundPage = (): JSX.Element => (
  <>
    <Header {...headerProps} />
    <PageContainer>
      <h1>お探しのページは見つかりません</h1>
      <p>お探しのページは存在しないか、移動した可能性があります。</p>
    </PageContainer>
  </>
);

export default NotFoundPage;
