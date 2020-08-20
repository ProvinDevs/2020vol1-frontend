import React, { FC, ReactNode } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

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
  },
});

type ChildrenType = {
  children: ReactNode;
};

const PageWrapper: FC<ChildrenType> = ({ children }: ChildrenType) => (
  <ThemeProvider theme={theme}>
    <div className={styles.pageWrapper}>{children}</div>
  </ThemeProvider>
);

export default PageWrapper;
