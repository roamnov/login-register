import  {  useState } from "react";
import {
  Grid,
  Autocomplete,
  TextField,
} from "@mui/material";
import axios from "axios";





const SelectOrg = (props) => {
 
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState("");
  const [orgs, setOrgList] = useState([]);

  const url = `${document.location.origin}/mobile~registration/values?type=inn`;
 
  const getOrg = () => {
      let params = new Map();
      params.set('prefix','project')
      params.set('comand', 'GetRegistryValues')
      params.set('type', 'inn')
      
      
      axios.get(url)
        .then((response) => {
          if (Object.keys(response.data).length == 0){
            setOrgList([]);
          }else{
            setOrgList(response.data);
          }
          
        });/**/
    
  };

  return (
    <Grid item xs={12} sm={12}>
      <Autocomplete
        disableClearable
        disablePortal
        fullWidth
        value={value}
        onChange={(event, newValue) => {
          props.setBackInfo(newValue.inn);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={orgs}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} required onClick={getOrg} id="inn" label="Организация" name="inn" error={props.error.search("inn") !== -1} />
        )}
      />
    </Grid>
  );
};

export default SelectOrg;
//