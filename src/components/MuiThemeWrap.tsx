import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "../App";
import { CssBaseline } from "@mui/material";
import { useAppSelector } from "../hooks/reduxHooks";

const MuiThemeWrap = () => {
  const { mode } = useAppSelector((store) => store.theme);
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

export default MuiThemeWrap;
