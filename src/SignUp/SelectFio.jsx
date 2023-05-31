import { useState, useEffect } from "react";
import {
  Grid,
  Autocomplete,
  TextField,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import axios from "axios";
import { CssTextField } from "../SignIn";

const SelectUser = (props) => {
  const [value, setValue] = useState();
  const [users, setUserList] = useState(new Array());
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    setUserList([]);
  }, [props.inn]);

  let url = window.FIO_url;
  // let url = `${document.location.origin}/mobile~registration/values?type=snils&inn=${props.inn}`;

  const getUser = () => {
    //setUserList([])
    setLoad(true);
    let params = new Map();
    params.set("prefix", "project");
    params.set("comand", "GetRegistryValues");
    params.set("type", "snils");
    params.set("inn", props.inn);

    axios.get(url + `&inn=${props.inn}`).then((response) => {
      if (Object.keys(response.data).length == 0) {
        setUserList([]);
      } else {
        setLoad(false);
        setUserList(response.data);
      }
    }); /* */
  };
  return (
    <Grid item xs>
      <Autocomplete
        loading={loading}
        loadingText={
          props.inn == undefined ? (
            "Необходимо выбрать организацию"
          ) : (
            <CircularProgress />
          )
        }
        onOpen={getUser}
        disableClearable
        options={users}
        getOptionLabel={(option) => option.name}
        disablePortal
        fullWidth
        value={value}
        onChange={(event, newValue) => {
          props.setBackInfo(newValue.snils);
        }}
        renderInput={(params) => (
          <CssTextField
            {...params}
            required
            id="snils"
            label="ФИО"
            name="snils"
            error={props.error.search("snils") !== -1}
          />
        )}
      />
    </Grid>
  );
};

export default SelectUser;
//
