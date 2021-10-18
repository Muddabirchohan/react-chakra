import { useState } from 'react'
import React from 'react';
import {
  useColorMode,
  Switch,
  Flex,
  Button,
  IconButton
} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import "./../App.css"

// import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
// import NextLink from 'next/link'


export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const [display, changeDisplay] = useState('none')
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  console.log("scroll", scrollPosition)



  return (
    scrollPosition < 28 ?  <Flex className="header-parent">
      <Flex
        position="fixed"
        //  top="1rem"
        // right="30rem"
        align="center"
      >
        {/* Desktop */}
        <Flex
          display={['none', 'none', 'flex', 'flex']}
        >
          <Link to="/home">
            <Button

              variant="ghost"
              aria-label="Home"
              my={5}
              w="100%"
            >
              Home
            </Button>
          </Link>

          <Link to="/about">
            <Button

              variant="ghost"
              aria-label="About"
              my={5}
              w="100%"
            >
              About
            </Button>
          </Link>

          <Link to="/contact">
            <Button

              variant="ghost"
              aria-label="Contact"
              my={5}
              w="100%"
            >
              Contact
            </Button>
          </Link>
        </Flex>

        {/* Mobile */}
        <IconButton
          aria-label="Open Menu"
          size="lg"
          mr={2}
          //   icon={
          //     <HamburgerIcon />
          //   }
          onClick={() => changeDisplay('flex')}
          display={['flex', 'flex', 'none', 'none']}
        />
        <Switch
          color="green"
          isChecked={isDark}
          onChange={toggleColorMode}
        />
      </Flex>

      {/* Mobile Content */}
      <Flex
        w='100vw'
        display={display}
        bgColor="gray.50"
        zIndex={20}
        h="100vh"
        pos="fixed"
        top="0"
        left="0"
        zIndex={20}
        overflowY="auto"
        flexDir="column"
      >
        <Flex justify="flex-end">
          <IconButton
            mt={2}
            mr={2}
            aria-label="Open Menu"
            size="lg"
            // icon={
            //   <CloseIcon />
            // }
            onClick={() => changeDisplay('none')}
          />
        </Flex>

        <Flex
          flexDir="column"
          align="center"
        >

        </Flex>
      </Flex>
    </Flex> : null
  )
}