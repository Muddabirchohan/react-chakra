import React from "react";
import {Link} from "react-router-dom";
import { List, ListItem, ListIcon, OrderedList, UnorderedList , Box } from "@chakra-ui/react"


const SideBar = (props) => {
return <div >
<UnorderedList className="list">

  <ListItem><Link to={"/home"}>Home</Link></ListItem>
  <ListItem><Link to={"/users"}>Users</Link></ListItem>
  <ListItem><Link to={"/users"}>Jobs</Link></ListItem>
  <ListItem><Link to={"/users"}>Account</Link></ListItem>

</UnorderedList>

 
</div>
};


export default SideBar;