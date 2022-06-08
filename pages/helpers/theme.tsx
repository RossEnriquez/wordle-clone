import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("gray.100", "#141214")(props),
    },
  }),
};

const fonts = {
  heading: `'Helvetica Neue', sans-serif`,
  body: `'Helvetica Neue', sans-serif`,
};

const theme = extendTheme({
  config,
  styles,
  fonts,
});

export default theme;
