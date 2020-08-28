import React, { useState } from "react";
import { Container, GridList, GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import EventListener from "react-event-listener";

import { markerList } from "../markers/index";
import Header, { HeaderProps } from "../components/common/Header";
import PageContainer from "../components/common/Container";

const headerProps: HeaderProps = {
  buttonText: "About",
  href: "/about",
};

const MarkerDownloadPage = (): JSX.Element => {
  const [windowSize, setWindowState] = useState(document.documentElement.clientWidth < 600 ? 1 : 3);

  const cols = () => {
    const window = document.documentElement.clientWidth;
    if (window < 600) {
      setWindowState(1);
    } else {
      setWindowState(3);
    }
  };

  const clickEventHandler = (srcURL: string, imageID: string) => {
    const a = document.createElement("a");
    a.href = srcURL;
    a.download = imageID;
    a.click();
  };

  return (
    <>
      <EventListener target="window" onResize={cols} />
      <Header {...headerProps} />
      <PageContainer>
        <h1>マーカーのダウンロード</h1>
        <Container maxWidth="md">
          <GridList cellHeight={300} cols={windowSize}>
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
