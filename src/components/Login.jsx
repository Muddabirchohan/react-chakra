import {
    CircularProgress,
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Avatar,
    FormControl,
    FormHelperText,
    InputRightElement
} from "@chakra-ui/react";

import ErrorMessage from "./ErrorMessage";
import { userLogin } from './MockApi';
import React from "react"
import {
    withRouter, Link
} from "react-router-dom";
import { history } from "./History";
import axios from 'axios';



async function userLoginDb(email,password){
    const loggedIn = await axios.post(`${process.env.REACT_APP_BASE_URL}login`,
    {name:email,password}  
    ).catch(ex => {
        console.log("exception", ex)
      })



    if(loggedIn){
        let user;
        user={
            userdata: loggedIn.data,
            token: loggedIn.token
        }
        localStorage.setItem("user",JSON.stringify(user))
        history.push("/users")
    }
  
}


function LoginForm() {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const handleSubmit = async event => {
        event.preventDefault();
        setIsLoading(true);
        try {
            // await userLogin({ email, password });
            await userLoginDb(email,password);
            setIsLoading(false);
            // history.push("/users")

        } catch (error) {
            console.log("err",error)
            setError('Invalid username or password');
            setIsLoading(false);
            setEmail('');
            setPassword('');
        }
    };


    return (

        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Avatar bg="teal.500" />
                <Heading color="teal.400">LOG IN</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form onSubmit={handleSubmit}>
                        {error && <ErrorMessage message={error} />}
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md"
                        >
                            <FormControl>
                                <InputGroup>
                                    {/* <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    /> */}
                                    <Input type="name" placeholder="email address"
                                        onChange={event => setEmail(event.currentTarget.value)}

                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    {/* <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    /> */}
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        onChange={event => setPassword(event.currentTarget.value)}

                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormHelperText textAlign="right">
                                    <Link>forgot password?</Link>
                                </FormHelperText>
                            </FormControl>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="teal"
                                width="full"
                            >
                                {isLoading ? (
                                    <CircularProgress
                                        isIndeterminate
                                        size="24px"
                                        color="teal"
                                    />
                                ) : (
                                    'Sign In'
                                )}
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                New to us?{" "}
                <Link color="teal.500" to="create-user">
                    Sign Up
                </Link>
            </Box>
        </Flex>


    );
}



export default withRouter(LoginForm)