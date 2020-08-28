import React from "react";

import { markerList } from "../markers/index";
import Header, { HeaderProps } from "../components/common/Header";
import PageContainer from "../components/common/Container";
import { Container, GridList, GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";

const headerProps: HeaderProps = {
  buttonText: "About",
  href: "/about",
};

const MarkerDownloadPage = (): JSX.Element => {
  const clickEventHandler = (srcURL: string, imageID: string) => {
    const a = document.createElement("a");
    a.href = srcURL;
    a.download = imageID;
    a.click();
  };

  return (
    <>
      <Header {...headerProps} />
      <PageContainer>
        <h1>マーカーのダウンロード</h1>
        <h3>画像をクリックすることでダウンロードできます。</h3>
        <Container maxWidth="md">
          <GridList cellHeight={300} cols={3}>
            {markerList.map((marker, index) => (
              <GridListTile key={index} cols={1}>
                <img id={marker.id} src={marker.imageSrc} alt={marker.id} />
                <GridListTileBar
                  title={marker.id}
                  actionIcon={
                    <IconButton
                      aria-label={`download ${marker.id}`}
                      onClick={() => clickEventHandler(marker.imageSrc, marker.id)}
                    >
                      <GetApp style={{ color: "white" }} />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </Container>
      </PageContainer>
    </>
  );
};

export default MarkerDownloadPage;
