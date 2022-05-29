import { Flex, Text } from "@chakra-ui/react";
import { GiHamburgerMenu, GiHelp } from "react-icons/gi";

const Navbar = () => {
  return (
    <>
      <Flex bg="gray.800" h="50px" justifyContent="space-between">
        <GiHamburgerMenu color="white" size={30} />
        <GiHelp color="white" size={20} />
        <Text color="white" alignSelf="center">
          Wordle
        </Text>
      </Flex>
    </>
  );
};

export default Navbar;
