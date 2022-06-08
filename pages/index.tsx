import {
  Text,
  Button,
  useColorMode,
  ColorModeScript,
  Box,
  Center,
  Flex,
  Wrap,
  Input,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import theme from "./helpers/theme";
import Link from "next/link";
import Navbar from "./components/navbar";
import { useState, KeyboardEvent, useEffect } from "react";
import { MotionConfig } from "framer-motion";

const IndexPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [guessIndex, setGuessIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const defaultGuess = { letter: undefined, colour: null, isAnimating: false };
  const [guess, setGuess] = useState(Array(30).fill(defaultGuess));

  const toast = useToast();
  const word = "manor";

  const handleKeyDown = (e) => {
    const min = guessIndex * 5;
    let result = [];
    console.log(e.keyCode);

    /* keyboard entry is in alphabet */
    if (e.keyCode >= 65 && e.keyCode <= 90 && letterIndex < 5) {
      result.push(
        ...guess.slice(0, min + letterIndex),
        {
          ...guess[min + letterIndex],
          letter: e.key.toUpperCase(),
          isAnimating: true,
        },
        ...guess.slice(min + letterIndex + 1, 30)
      );
      setGuess(result);
      setLetterIndex(letterIndex + 1);
    } else if (
      e.keyCode === 8 &&
      Math.ceil((guessIndex * 5 + letterIndex) / 5.0) > guessIndex
    ) {
      console.log("delete!");
      result.push(
        ...guess.slice(0, min + letterIndex - 1),
        { defaultGuess },
        ...guess.slice(min + letterIndex, 30)
      );
      setGuess(result);
      setLetterIndex(letterIndex - 1);
    } else if (e.keyCode === 13 && letterIndex === 5) {
      console.log("submit!");
      submitGuess(e);
    }
  };

  const submitGuess = (e) => {
    const min = guessIndex * 5;
    const max = min + 5;
    let result = [...guess.slice(0, min)];

    /* calculate letter colours */
    for (let i = 0; i < 5; i++) {
      if (guess[min + i].letter === word[i].toUpperCase()) {
        console.log("green!");
        result.push({ ...guess[min + i], colour: "#538d4e" });
      } else if (word.toUpperCase().indexOf(guess[min + i].letter) !== -1) {
        console.log("yellow!");
        result.push({ ...guess[min + i], colour: "#b49f3a" });
      } else {
        result.push({ ...guess[min + i], colour: "#787c7e" });
      }
    }
    result.push(...guess.slice(max));
    setGuess(result);

    /* calibrate index trackers */
    setGuessIndex(guessIndex + 1);
    setLetterIndex(0);
  };

  function playerWin() {
    toast({
      title: "You won!",
      description: `The word was ${word.toUpperCase()}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    // console.log(guess);
    // console.log(letterIndex);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [guess, letterIndex]);

  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Navbar />
      {/* <Button onClick={toggleColorMode}>Mode</Button> */}

      <Center>
        <Wrap maxW="345px" h="425px" p="6px">
          {guess.map((i, key) => {
            return (
              <motion.div
                animate={i.isAnimating ? { scale: [1, 1.2, 1] } : null}
                transition={{ duration: 0.1 }}
              >
                <Center
                  bg={i?.colour}
                  borderWidth={i?.colour === null ? "2px" : "0px"}
                  borderColor={i?.letter ? "gray.600" : "gray.700"}
                  minW="60px"
                  h="60px"
                  key={key}
                >
                  <Text
                    fontSize={30}
                    fontWeight="bold"
                    fontFamily="Helvetica Neue"
                  >
                    {i?.letter}
                  </Text>
                </Center>
              </motion.div>
            );
          })}
        </Wrap>
      </Center>
      {/* <Input
        autoFocus
        onKeyDown={handleKeyDown}
        onChange={handleKeyboardEvent}
        maxLength={5}
      /> */}
    </>
  );
};

export default IndexPage;
