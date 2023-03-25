import App from "./core/App";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import customMuiTheme from "commons/theme/customMuiTheme";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "./utils/snackbarUtils";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { store } from "core/store/store";
import { saveInitialData } from "utils/initialDataSet";

const Providers = () => {
  saveInitialData();
  
  return (
    <Provider store={store}>
      <ThemeProvider theme={customMuiTheme}>
        <BrowserRouter>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            style={{ maxWidth: 300 }}
            preventDuplicate
          >
            <SnackbarUtilsConfigurator />
            <CssBaseline />
            <App />
          </SnackbarProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <Providers />
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
