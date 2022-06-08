import { Box, Flex, Text } from "@chakra-ui/react";
import { GiHamburgerMenu, GiHelp } from "react-icons/gi";
import { AiFillSetting } from "react-icons/ai";

const Navbar = () => {
  return (
    <>
      <Flex bg="gray.800" h="50px" justifyContent="space-between">
        <Flex id="left-nav" ml="20px" alignSelf="center">
          <GiHamburgerMenu color="white" size={30} />
          {/* <GiHelp color="white" size={25} /> */}
        </Flex>
        <Text color="white" alignSelf="center">
          Wordle
        </Text>
        <Flex id="right-nav" mr="20px" alignSelf="center">
          <AiFillSetting color="white" size={25} />
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
