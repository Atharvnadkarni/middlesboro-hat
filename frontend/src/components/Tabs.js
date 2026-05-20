import { Tab, Tabs as TabContainer } from "@mui/material"
import { useState } from "react";
import { Link } from "react-router";

const Tabs = () => {
    const [value, setValue] = useState(0);
    const handleChange = (e, newValue) => {
        setValue(newValue)
    }
  return (
   <TabContainer value={value} onChange={handleChange} sx={{marginBottom:2}}>
    <Tab label="marktable" component={Link} to="/" />
    <Tab label="teachers" component={Link} to="/teachers" />
   </TabContainer>
  )
}
export default Tabs