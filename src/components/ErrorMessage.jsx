import React from 'react';
import {
AlertDescription,
Alert,
Box
  } from "@chakra-ui/react"
  export default function ErrorMessage({ message }) {
    console.log("ms",message)

//     const [hideError,setHideError] = React.useState(false);

// React.useEffect(()=>{

//     setTimeout(()=>{
//         setHideError(true)
//     },3000)

// },[message])



  return (


     <Box my={4}>
      <Alert borderRadius={4}>
        {/* <AlertIcon /> */}
       <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Box>
  );
}