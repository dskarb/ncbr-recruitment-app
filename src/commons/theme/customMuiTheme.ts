import { createTheme } from "@mui/material";

export default createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      a {
        color: inherit;
        text-decoration: none;
      }

      body: {
        scrollbar-width: thin;
        scrollbar-color: #97A9C4 #D0DBE1;
      }

      ::-webkit-scrollbar {
          width: 15px;
      }
      
      ::-webkit-scrollbar-track {
        margin: 0;
        background: #D0DBE1;
        border: 5px transparent solid;
        border-radius: 100px;
        background-clip: padding-box;
      }
      
      ::-webkit-scrollbar-thumb {
        background: #1976D2;
        border: 5px transparent solid;
        border-radius: 100px;
        background-clip: padding-box;
      }

      .SnackbarItem-message {
        word-break: break-word;
      }
      `,
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: () => ({
          marginLeft: 0,
        }),
      },
    },
  },
});
