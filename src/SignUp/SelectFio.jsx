import  {useEffect  ,useState } from "react";
import {
  Grid,
  Autocomplete,
  TextField,
} from "@mui/material";
import axios from "axios";


const SelectUser = (props) => {
 
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState("");
  const [users, setUserList] = useState(new Array);


  let url = `${document.location.origin}/mobile~registration/values?type=snils&inn=${props.inn}`;
  const urlReqTest = `http://localhost:1317/registration/values?type=snils&inn=${props.inn}`;
/**/
  useEffect(() => {
    //setValue("STAS")
  }, [props.inn])


  const getUser = () => {
   
      setUserList([])
      let params = new Map();
      params.set('prefix','project')
      params.set('comand', 'GetRegistryValues')
      params.set('type', 'snils')
      params.set('inn',props.inn);
      axios.get(url).then((response) => {
          setUserList(response.data);
        });
       //key={props.inn}
  };
  return (
    <Grid item xs>
      <Autocomplete
     
        disableClearable
        options={users}
        getOptionLabel={(option) => option.name}
        disablePortal
        fullWidth
        value={value}
        onChange={(event, newValue) => {
          props.setBackInfo(newValue.snils)
        }}
        renderInput={(params) => (
          <TextField {...params} onClick={getUser} required id="snils" label="ФИО" name="snils" error={props.error.search("snils") !== -1} />
        )}
      />
    </Grid>
  );
};

export default SelectUser;
//