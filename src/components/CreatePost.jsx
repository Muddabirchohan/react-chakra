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
import { userSignup } from './MockApi';
import React from "react"
import {
    Link,
    withRouter
} from "react-router-dom";
import { history } from "./History";
import axios from "axios";




function CreatePost() {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    const [description, setDescriptio ] = React.useState('');
    const [name, setName] = React.useState('');
    const [image, setImage] = React.useState('');
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);


    const addUserToDb = async (imageData) => {
        let postId = JSON.parse(localStorage.getItem("user")).userdata.user._id
        let token = JSON.parse(localStorage.getItem("user"))?.userdata?.token


        let data = {
            name,
            description,
            image: imageData.url,
            userId: postId
        }

        await axios.post(`${process.env.REACT_APP_BASE_URL}posts`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        })
    }


    const handleSubmit = async event => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "gynssk1y")
            data.append("cloud_name", "chohan")
            fetch("https://api.cloudinary.com/v1_1/chohan/image/upload", {
                method: 'post',
                body: data
            }).then(resp => resp.json())
                .then(data => {
                    addUserToDb(data)
                    history.push("/posts")

                }).catch(ex =>  {
                    
                    console.log("ex",ex)
                })                
        } catch (error) {
            console.log("error", error)
            setError("error");
            setIsLoading(false);
            setDescriptio('');
            // setPassword('');
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
                <Heading color="teal.400">CREATE POST</Heading>
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

                                    <Input type="text" placeholder="description"
                                        onChange={event => setDescriptio(event.currentTarget.value)}

                                    />
                                </InputGroup>
                            </FormControl>

                            <FormControl>
                                <InputGroup>

                                    <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>

                                </InputGroup>
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
                                    "CREATE"
                                )}
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
       
        </Flex>


    );
}



export default withRouter(CreatePost)