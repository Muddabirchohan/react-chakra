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
    Link,
    Avatar,
    FormControl,
    FormHelperText,
    InputRightElement
} from "@chakra-ui/react";

import ErrorMessage from "./ErrorMessage";
import { userSignup } from './MockApi';
import React from "react"
import { withRouter } from "react-router-dom";
import { history } from "./History";
import axios from "axios";




function Signup() {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [image, setImage] = React.useState('');
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);


    const addUserToDb = (imageData) =>{
        
        let data = {
            name,
            email,
            password,
            image : imageData.url
        }

        let s = axios.post(`${process.env.REACT_APP_BASE_URL}users`,data)
        console.log("a",s)
    }


    const handleSubmit = async event => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "gynssk1y")
            data.append("cloud_name", "chohan")
            let imageUpload= fetch("https://api.cloudinary.com/v1_1/chohan/image/upload", { 
            method:'post',
            body:data
            }).then(resp => resp.json())
            .then(data => {
                 addUserToDb(data)
            })
            // let signUpData = await userSignup({ name,email, password,image });
            // console.log("signup",signUpData)
            // setIsLoading(false);
         
            
            

        } catch (error) {
            console.log("error",error)
            setError("error");
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
                <Heading color="teal.400">Welcome To Chohanics</Heading>
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

                                    <Input type="name" placeholder="name"
                                        onChange={event => setName(event.currentTarget.value)}

                                    />
                                </InputGroup>
                            </FormControl>

                            <FormControl>
                                <InputGroup>

                                    <Input type="email" placeholder="email address"
                                        onChange={event => setEmail(event.currentTarget.value)}

                                    />
                                </InputGroup>
                            </FormControl>

                            <FormControl>
                                <InputGroup>

                                <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>

                                </InputGroup>
                            </FormControl>


                            <FormControl>
                                <InputGroup>

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
                <Link color="teal.500" href="#">
                    Sign Up
                </Link>
            </Box>
        </Flex>


    );
}



export default withRouter(Signup)