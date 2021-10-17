import React from "react";
import {Link} from "react-router-dom";
import { List, ListItem, ListIcon, OrderedList, UnorderedList , Box } from "@chakra-ui/react"


const SideBar = (props) => {
return <div >
<UnorderedList className="list">

  <Box bg="red.400" color="white" height="500">
  <ListItem><li><Link to={"/home"}>Home</Link></li></ListItem>
  <ListItem><li><Link to={"/users"}>Users</Link></li></ListItem>
  <ListItem><li><Link to={"/users"}>Jobs</Link></li></ListItem>
  <ListItem><li><Link to={"/users"}>Account</Link></li></ListItem>
  </Box>

</UnorderedList>

 
</div>
};


export default SideBar;