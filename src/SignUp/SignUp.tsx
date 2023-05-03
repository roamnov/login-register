import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "../Styles.ts";
import Container from "@mui/material/Container";
import axios from "axios";
//import SelectOrg from './SelectOrg';
import SelectUser from "./SelectFio";
import { Link } from "react-router-dom";
import SelectOrg from "./SelectOrg";
import AlertDialogSlide from "./Alert";
import { TransitionProps } from "@mui/material/transitions";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Slide,
  Tooltip,
  styled,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import BigLogoAndPerosnal from "../BigLogoAndPerosnal.png";
import capha from "../caphatest.jpg";
import RefreshIcon from "@mui/icons-material/Refresh";
import { CssTextField } from "../SignIn";
import { useStyles } from "../Styles";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

declare global {
  interface Window {
    signUP_url?: any;
  }
}

export default function SignUp() {
  const styles = useStyles();
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  document.title = "Регистрация";
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [snils, setSnils] = React.useState();
  const [inn, setInn] = React.useState();
  const [fio, setFio] = React.useState("");
  const [error, setError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [captcha, setCaptcha] = React.useState("");
  const [DataCaptcha, setDataCapctha] = React.useState<any>({ passed: false, color:"" });
  const [showpassword, setShowPassword] = React.useState(false);

  const url = window.signUP_url;

  const handleClickShowPassword = () => {
    setShowPassword(!showpassword);
  };
  React.useEffect(() => {
    getCaptha();
  }, []);

  const getCaptha = (color?:any) => {
    axios.get(`${document.location.origin}/mobile~captcha`).then((res) => {
      // console.log(DataCaptcha)
      setCaptcha("")
      setDataCapctha({
        img: "data:image/gif;base64," + res.data.RCDATA,
        ident: res.data.ident,
        passed: false,
        color:color?color:""
      });
    });
  };

  const sendCaptha = () => {
    // console.log(DataCaptcha)
    axios
      .get(
        `${document.location.origin}/mobile~captcha?ident=${DataCaptcha.ident}&check=${captcha}`
      )
      .then((res) => {
        if (res.data.result === "1") {
          setDataCapctha({ ...DataCaptcha, passed: true, color:"Успешно." });
        }else{
          getCaptha("Повторите ещё раз.")
        }
      });
  };

  const second = (
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
        {/* <Grid item> */}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Tooltip title={"Обновить текст на картинке"} placement="left">
            <IconButton onClick={()=>{getCaptha()}}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Grid item sx={{ pb: 1, pt: 1 }} style={{ width: "179px" }}>
            {/* <input
            type="text"
            placeholder="Введите текст с картинки"
            style={{ width: "64%" }}
          /> */}
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
              // width: "100%",
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
              // sx={{ mt: 3, mb: 2 }}
            >
              Отправить
            </Button>
          </Grid>
        </Grid>
        {/* </Grid> */}
      </Grid>
    </Grid>
  );

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClose = () => {
    setOpen(false);
    if (status === true) {
      window.history.back();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let errors = "";
    let checkbox = AllowData(event.currentTarget[13]);

    let SignUpData = {
      login: data.get("login"),
      email: data.get("email"),
      password: data.get("password"),
      inn: inn,
      snils: snils,
    };

    if (checkbox === false) {
      errors += "checkbox";
      setError(errors);
    }

    for (const [key, value] of Object.entries(SignUpData)) {
      if (value === "" || value === undefined) {
        errors += key;
        setError(errors);
      }
      if (key === "email" && pattern.test(email) === false) {
        errors += key;
        setError(errors);
      }
    }

    if (errors === "") {
      axios.post(url, JSON.stringify(SignUpData)).then((response) => {
        //console.log(response)
        if (response.data["status"] === "ok") {
          setStatus(true);
          setMessage(response.data["message"]);
        } else {
          setStatus(false);
          setMessage(response.data["status"]);
        }
        setOpen(true);
      });
    } /**/
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const AllowData = (input: any) => {
    return input["checked"];
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={BigLogoAndPerosnal} style={{ width: "45%" }} />
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 0.8 }}
          autoComplete="off"
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={12}>
              <CssTextField
                required
                fullWidth
                id="login"
                label="Логин"
                name="login"
                error={error.search("login") !== -1}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <CssTextField
                value={email}
                onChange={handleChange}
                required
                fullWidth
                id="email"
                label="E-mail (Электронная почта для подтверждения регистрации)"
                name="email"
                error={error.search("email") !== -1}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": { borderColor: "#3c5b77" },
                  },
                }}
              >
                <InputLabel
                  required
                  htmlFor="password"
                  sx={{ "&.Mui-focused": { color: "#3c5b77" } }}
                >
                  Пароль
                </InputLabel>
                <OutlinedInput
                  type={showpassword ? "text" : "password"}
                  required
                  fullWidth
                  id="password"
                  label="Пароль"
                  name="password"
                  error={error.search("password") !== -1}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showpassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <SelectOrg error={error} setBackInfo={setInn} />
            <SelectUser
              error={error}
              inn={inn}
              fio={fio}
              setBackInfo={setSnils}
            />
            <Grid item xs={12}>
              <FormControlLabel
                style={{ color: error.search("checkbox") !== -1 ? "red" : "" }}
                control={
                  <Checkbox
                    style={{
                      color:
                        error.search("checkbox") !== -1 ? "red" : "#07579f",
                    }}
                    value="allowPersonalData"
                    color="primary"
                  />
                }
                label="Я согласен на обработку персональных данных (настоящим подтверждаю, что в случае регистрации мною третьих лиц, предоставляю персональные данные с их согласия)"
              />
            </Grid>
            {second}
          </Grid>
          <AlertDialogSlide
            setStatus={setStatus}
            message={message}
            status={status}
            open={open}
          />
          <Button
            style={{ backgroundColor: "#3c5b77", textTransform: "none" }}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!DataCaptcha.passed}
          >
            Зарегистрироваться
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={"/"} className={styles.link}>
                Уже есть учётная запись? Войти
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {message}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
/*

<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Регистрация
          </Typography>

if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

*/
