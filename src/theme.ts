import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
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
