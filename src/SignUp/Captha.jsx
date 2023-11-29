import { Button, Grid, IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import React from "react";
import axios from "axios";
import { CssTextField } from "../SignIn";

export default function Captha(props) {
  const [captcha, setCaptcha] = React.useState("");
//   const [count, setCount] = React.useState(0);
  const [DataCaptcha, setDataCapctha] = React.useState({
    passed: window.BASE_CAPTCHA === "0" ? true : false,
    color: "",
  });

  React.useEffect(() => {
    getCaptha()
    // return () => {
    //   second
    // }
  }, [])
  

  const getCaptha = (color) => {
    axios.get(`${document.location.origin}/mobile~captcha`).then((res) => {
      //
      setCaptcha("");
      setDataCapctha({
        img: "data:image/gif;base64," + res.data.RCDATA,
        ident: res.data.ident,
        passed: false,
        color: color ? color : "",
      });
    });
  };

  const sendCaptha = () => {
    axios
      .get(
        `${document.location.origin}/mobile~captcha?ident=${DataCaptcha.ident}&check=${captcha}`
      )
      .then((res) => {
        if (res.data.result === "1") {
          setDataCapctha({ ...DataCaptcha, passed: true, color: "Успешно." });
          props.setCaptcha(true)
        } else {
          getCaptha("Повторите ещё раз.");
          if(props.setCount)
            props.setCount(props.count +1)
        }
      });
  };

  return (
    <Grid item xs={10}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        style={{
          borderStyle: "solid",
          borderWidth: "1px",
          borderRadius: "4px",
          borderColor: "rgb(60, 91, 119)",
        }}
      >
        <Grid
          item
          style={{ width: "100%", backgroundColor: "rgb(60, 91, 119)" }}
        >
          <img
            src={DataCaptcha.img}
            style={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "rgb(236, 236, 236)",
              width: "97%",
            }}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Tooltip title={"Обновить текст на картинке"} placement="left">
            <IconButton
              onClick={() => {
                getCaptha();
              }}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Grid item sx={{ pb: 1, pt: 1 }} style={{ width: "179px" }}>
            <CssTextField
              size={"small"}
              id="captha"
              name="captha"
              value={captcha}
              sx={{ ".MuiInputLabel-outlined": { fontSize: "12px" } }}
              label="Введите текст с картинки"
              helperText={DataCaptcha.color}
              onChange={(e) => {
                setCaptcha(e.target.value);
              }}
            />
          </Grid>
          <Grid
            item
            sx={{ p: 1 }}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              style={{
                backgroundColor: "#3c5b77",
                textTransform: "none",
              }}
              size="small"
              variant="contained"
              onClick={sendCaptha}
            >
              Отправить
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
