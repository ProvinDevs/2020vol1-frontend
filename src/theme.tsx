import React, { FC } from "react";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";

import styles from "./scss/theme.scss";

const theme = createMuiTheme({
  props: {
    MuiTextField: {
      variant: "outlined",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      light: "#AEC4E5",
      main: "#6088C6",
      dark: "#4072B3",
    },
    secondary: {
      main: "#EB8686",
    },
    text: {
      primary: "#2d2d2d",
      secondary: "#757575",
    },
  },
});

const PageWrapper: FC = ({ children }) => (
  <>
    <span id="back-to-top-anchor"></span>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.pageWrapper}>{children}</div>
    </ThemeProvider>
  </>
);

export default PageWrapper;
