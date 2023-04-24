
import { createTheme } from "@mui/material/styles";

/* @default: #ededed;
@primary: #00aeef;
@info: #ee7b28;
@success: #97d271;
@warning: #fdd198;
@danger: #FFD073; */
// color design tokens export

const mycolors={
  default: {
      100: "#fbfbfb",
      200: "#f8f8f8",
      300: "#f4f4f4",
      400: "#f1f1f1",
      500: "#ededed",
      600: "#bebebe",
      700: "#8e8e8e",
      800: "#5f5f5f",
      900: "#2f2f2f"
  },
  primary: {
      100: "#cceffc",
      200: "#99dff9",
      300: "#66cef5",
      400: "#33bef2",
      500: "#00aeef",
      600: "#008bbf",
      700: "#00688f",
      800: "#004660",
      900: "#002330"
  },
  info: {
      100: "#fce5d4",
      200: "#f8caa9",
      300: "#f5b07e",
      400: "#f19553",
      500: "#ee7b28",
      600: "#be6220",
      700: "#8f4a18",
      800: "#5f3110",
      900: "#301908"
  },
  success: {
      100: "#eaf6e3",
      200: "#d5edc6",
      300: "#c1e4aa",
      400: "#acdb8d",
      500: "#97d271",
      600: "#79a85a",
      700: "#5b7e44",
      800: "#3c542d",
      900: "#1e2a17"
  },
  warning: {
      100: "#fff6ea",
      200: "#feedd6",
      300: "#fee3c1",
      400: "#fddaad",
      500: "#fdd198",
      600: "#caa77a",
      700: "#987d5b",
      800: "#65543d",
      900: "#332a1e"
  },
  danger: {
      100: "#fff6e3",
      200: "#ffecc7",
      300: "#ffe3ab",
      400: "#ffd98f",
      500: "#ffd073",
      600: "#cca65c",
      700: "#997d45",
      800: "#66532e",
      900: "#332a17"
  },  
}

export const mytheme=createTheme({
  palette: {
      common: {
          main: mycolors.default[500],
      },
      primary: {
          main: mycolors.primary[500],
      },
      info: {
          main: mycolors.info[500],
      },
      success: {
          main: mycolors.success[500],
      },
      warning: {
          main: mycolors.warning[500],
      },
  }
  ,
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
      button: {
        textTransform: 'none'
      },
    },
});
