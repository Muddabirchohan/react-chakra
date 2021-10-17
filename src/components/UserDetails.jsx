import React from "react";
import {Box,Button,Modal,ModalBody,ModalContent,ModalCloseButton,Lorem,ModalOverlay,ModalHeader,ModalFooter,useDisclosure} from '@chakra-ui/react'


const UserDetails = (props) => {
    console.log("props",props)

    return(
    <div> 
              <>
        <Modal isOpen={props.isModalOpen} onClose={()=>props.closeModal()}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>


            <Box className="container">

                <div className="one"> 
                <p> Name </p>
                <p> Updated At </p>
                </div>
                <div className="two"> 
                <p> {props.userDetail?.name} </p>
                <p> {props.userDetail?.updatedAt} </p>
                </div>
         
            </Box>
            <div>
                 <img className="image-centre"  src={props.userDetail?.image} />
                 </div>


            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={()=>props.closeModal()}>
                Close
              </Button>
              {/* <Button variant="ghost">Secondary Action</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </div>
)
};
export default UserDetails;

