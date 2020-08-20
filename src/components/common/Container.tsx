import React, { FC } from "react";
import { Container, Box, Zoom, useScrollTrigger, Fab } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { KeyboardArrowUp } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
  }),
);

const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
  const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
    "#back-to-top-anchor",
  );
  if (anchor) {
    anchor.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

const ScrollTop: FC = ({ children }) => {
  const classes = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
};

const PageContainer: FC = ({ children }) => (
  <>
    <Container>
      <Box>{children}</Box>
    </Container>
    <ScrollTop>
      <Fab color="primary" size="small" aria-label="scroll back to top">
        <KeyboardArrowUp />
      </Fab>
    </ScrollTop>
  </>
);

export default PageContainer;
