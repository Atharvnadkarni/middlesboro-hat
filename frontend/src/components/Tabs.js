import { Tab, Tabs as TabContainer } from "@mui/material"
import { useEffect, useState } from "react";
import { Link } from "react-router";

const Tabs = ({value: valueData}) => {
    const [value, setValue] = useState(0);
    useEffect(() => {
      if (valueData) setValue(value)
    }, [])
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