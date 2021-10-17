import React from "react";
import {Link} from "react-router-dom";
import SideBar from "./Sidebar";
import { Grid, GridItem } from "@chakra-ui/react"
import { Header } from "./Header";


const Layout = (props) => {
return <div>
<Header/>

<Grid
  h="600px"
  templateRows="repeat(2, 1fr)"
  templateColumns="repeat(5, 1fr)"
  gap={10}
>
<GridItem rowSpan={2} colSpan={1} bg="tomato" className="sidebar">
  <div> 
   <SideBar/>
</div>
</GridItem>  

<GridItem  colSpan={4} rowSpan={2} bg="papayawhip" style={{marginTop: 100}} className="main-content">
<div> 
{props.children}
</div>
</GridItem>

</Grid>

</div>
};
export default Layout;