import { useState } from "react";
import {
  Grid,
  Autocomplete,
  TextField,
  CircularProgress,
  styled,
} from "@mui/material";
import { CssTextField } from "../SignIn";
import axios from "axios";

const SelectOrg = (props) => {
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState("");
  const [orgs, setOrgList] = useState([]);
  const [loading, setLoad] = useState(true);

  const url = window.ORG_url;

  const getOrg = () => {
    setLoad(true);
    let params = new Map();
    params.set("prefix", "project");
    params.set("comand", "GetRegistryValues");
    params.set("type", "inn");

    axios.get(url).then((response) => {
      if (Object.keys(response.data).length == 0) {
        setOrgList([]);
      } else {
        setLoad(false);
        setOrgList(response.data);
      }
    }); /**/
  };

  return (
    <Grid item xs={12} sm={12}>
      <Autocomplete
        loading={loading}
        onOpen={()=>{
          setOrgList([]);
          getOrg();
        }}
        loadingText={<CircularProgress />}
        disableClearable
        disablePortal
        fullWidth
        value={value}
        onChange={(event, newValue) => {
          setValue(value)
          props.setBackInfo(newValue.inn);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={orgs}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <CssTextField
            {...params}
            required
            id="inn"
            label="Организация"
            name="inn"
            error={props.error.search("inn") !== -1}
            sx={{}}
          />
        )}
      />
    </Grid>
  );
};

export default SelectOrg;
//
