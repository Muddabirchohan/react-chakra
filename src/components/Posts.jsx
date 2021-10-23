import React from "react";
import axios from "axios"

import {
  Spinner,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Stack,
  Box,
  Input
} from "@chakra-ui/react"
import "./../App.css"
import { toast } from 'react-toastify'
// import {history} from"./History";
import { withRouter } from "react-router";
import postDetails from "./PostDetails";
import PostDetails from "./PostDetails";





const Posts = ({history}) => {

  const [posts, setPostsList] = React.useState([]);
  const [userLoader, setPostsLoader] = React.useState(true);
  const [headerName, setHeaderName] = React.useState(window.location.href.split("/")[3]);
  const [url, setUrl] = React.useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [detail,setDetails] = React.useState({});
  const [searched,setSearched] = React.useState('');

  
  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleOPenModal = (user) => {
    setDetails(user)
    setIsOpen(true)
  }


  


  React.useEffect(() => {
    getPosts()
  }, [])


  const getPosts = async () => {
    let fetchPosts;
    let postId = JSON.parse(localStorage.getItem("user")).userdata.user._id

    // setInterval(async () => {

    fetchPosts = await axios.get(`${process.env.REACT_APP_BASE_URL}posts/${postId}`).catch(ex => {
      console.log("ex", ex)
      setPostsList([])
      setPostsLoader(false);
    })


    // },3000)



    if (fetchPosts) {
      await setPostsLoader(false);
      await setPostsList(fetchPosts.data)
    }
  }


  const getLatestUsers = async () => {
    await getPosts()
  }

  const deleteUser = async (id) => {
    // app.delete('/users/:userId', users.delete);
    const deleteUser = await axios.delete(`${process.env.REACT_APP_BASE_URL}users/${id}`).catch(ex => {
      console.log("ex", ex)
    })


    if (deleteUser) {
      toast(deleteUser?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      await getPosts()
    }

  }


  const createPost = () =>{
    history.push("/create-post")
  }

  const filterData = (e) => {
    setSearched(e.target.value)
  }

  let filtered = posts.filter(item => item.name.includes(searched))


  return (
    <div className="users">


      <Button onClick={createPost} style={{float: "right"}}> Create </Button>

      <Box bg="red.400" color="white" className="header-strip">
        <h3> {headerName} List </h3> 
      </Box>

      <Input type="search" onChange={filterData} placeholder="search by name"/>

      <Box overflowX="auto">

        <Table variant="simple">

          {filtered && filtered.length === 0 && <TableCaption>No Data Found</TableCaption>}
          {userLoader &&
            <Spinner style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'table-caption'
            }} />
          }
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Active</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filtered && filtered.map((item, index) => {



              return <Tr key={index}>
                <Td onClick={()=>handleOPenModal(item)}>{item.name ?? "-"}</Td>
                <Td>{item.description ?? "-"}</Td>

                <Td>{item.isActive ?? "-" ? "true" : "false"}</Td>
                <Td>{item.status ?? "-" ? "true" : "false"}</Td>
                <Td>
                  <Stack direction="row" spacing={3} align="center">


                    <Button
                      // isLoading
                      loadingText="Loading"
                      colorScheme="teal"
                      variant="outline"
                      spinnerPlacement="start"
                      onClick={() => deleteUser(item._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      // isLoading
                      loadingText="Loading"
                      colorScheme="teal"
                      variant="outline"
                      spinnerPlacement="end"
                    >
                      InActive
                    </Button>
                  </Stack>

                </Td>


              </Tr>

            })

            }


          </Tbody>

        </Table>
      </Box>



      <PostDetails 
      isModalOpen={modalIsOpen}
      closeModal={handleCloseModal}
      userDetail={detail}
      />


    </div>
  )
};
export default withRouter(Posts);