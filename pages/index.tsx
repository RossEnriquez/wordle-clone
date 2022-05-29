import { Text, Button, useColorMode, ColorModeScript } from "@chakra-ui/react";
import theme from "./helpers/theme";
import Link from "next/link";
import Navbar from "./components/navbar";

const IndexPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Navbar />
    </>
  );
};

export default IndexPage;
