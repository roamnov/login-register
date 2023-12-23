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
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

const SelectUser = (props) => {
  const [value, setValue] = useState();
  const [users, setUserList] = useState(new Array());
  const [inputValue, setInputValue] = useState("");
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
        setLoad(false);
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
        getOptionLabel={(option) => option.name|| ""}

        fullWidth
        noOptionsText="Ничего не найдено."
        value={value}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={(event, newValue) => {
          setValue(newValue.name)
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
        renderOption={(props, option, { inputValue }) => {
          const text = option.name;
          const matches = match(text, inputValue);
          const parts = parse(text, matches);

          return (
            <li {...props}>
              <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </li>
          );
        }}
      />
    </Grid>
  );
};

export default SelectUser;
//
