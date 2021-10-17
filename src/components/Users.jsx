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
  Box
} from "@chakra-ui/react"
import "./../App.css"
import { toast } from 'react-toastify'
import {history} from"./History";
import UserDetails from "./UserDetails";






const Users = () => {

  const [users, setUsersList] = React.useState([]);
  const [userLoader, setUsersLoader] = React.useState(true);
  const [headerName, setHeaderName] = React.useState(window.location.href.split("/")[3]);
  const [url, setUrl] = React.useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [detail,setDetails] = React.useState({});
  
  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleOPenModal = (user) => {
    setDetails(user)
    setIsOpen(true)
  }


  


  React.useEffect(() => {
    getUsers()
  }, [])


  const getUsers = async () => {
    let fetchUsers;
    // setInterval(async () => {

    fetchUsers = await axios.get(`${process.env.REACT_APP_BASE_URL}users`).catch(ex => {
      console.log("ex", ex)
      setUsersList([])
      setUsersLoader(false);
    })


    // },3000)



    if (fetchUsers) {
      await setUsersLoader(false);
      await setUsersList(fetchUsers.data)
    }
  }


  const getLatestUsers = async () => {
    await getUsers()
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
      await getUsers()
    }

  }


  const createUser = () =>{
    history.push("/create-user")
  }




  return (
    <div className="users">




      <Button onClick={createUser} > Create </Button>



      <Box bg="red.400" color="white" className="header-strip">
        <h3> {headerName} List </h3>
      </Box>



      <Box overflowY="auto">

        <Table variant="simple">

          {users && users.length === 0 && <TableCaption>No Data Found</TableCaption>}
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
              <Th>Gender</Th>
              <Th>Age</Th>
              <Th>Active</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users && users.map((item, index) => {



              return <Tr key={index}>
                <Td onClick={()=>handleOPenModal(item)}>{item.name ?? "-"}</Td>
                <Td>{item.description ?? "-"}</Td>
                <Td>{item.gender ?? "-"}</Td>
                <Td>{item.age ?? "-"}</Td>
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



      <UserDetails 
      isModalOpen={modalIsOpen}
      closeModal={handleCloseModal}
      userDetail={detail}
      />


    </div>
  )
};
export default Users;