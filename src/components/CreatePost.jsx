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
import { toast } from "react-toastify";





function CreatePost() {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    const [description, setDescription ] = React.useState('');
    const [name, setName] = React.useState('');
    const [image, setImage] = React.useState('');
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);


    const addPostToDb = async (imageData) => {
        let postId = JSON.parse(localStorage.getItem("user"))?.userdata?.user?._id
        let token = JSON.parse(localStorage.getItem("user"))?.userdata?.token


        let data = {
            name,
            description,
            image: imageData,
            userId: postId
        }

        let res = await axios.post(`${process.env.REACT_APP_BASE_URL}posts`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }).catch(e => {
            const { response: {data : 
                {message}
                      }} = e
                      toast(message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
        })

        if(res && res.status === 200){
            toast("Post Created Succesfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            history.push("/posts")
        }
    }


    const handleSubmit = async event => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "gynssk1y")
            data.append("cloud_name", "chohan")
            let res = await axios.post("https://api.cloudinary.com/v1_1/chohan/image/upload", data
            );   
            
            if(res && res.status === 200){
                const {data : {url}} = res
                addPostToDb(url)
            }

        } catch (error) {
            const { response : 
                {data : 
                {error : 
                {message
                }
                    }
                     }
                      } = error
            
                      toast(message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
            setError("error");
            setIsLoading(false);
            // setDescription('');
            // setPassword('');
        }
        
            //  history.push("/posts")

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
                                        onChange={event => setDescription(event.currentTarget.value)}

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