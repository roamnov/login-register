import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grow from "@mui/material/Grow";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import Container from "@mui/material/Container";
import axios from "axios";
//import SelectOrg from './SelectOrg';
import HelpIcon from "@mui/icons-material/Help";
import { Link } from "react-router-dom";
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
import RefreshIcon from "@mui/icons-material/Refresh";
import { CssTextField } from "../SignIn";
import { useStyles } from "../Styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ruRU } from "@mui/x-date-pickers/locales";
import { DateField } from "@mui/x-date-pickers";

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
    BASE_CAPTCHA?: any;
  }
}

export default function SignUpUMI() {
  const styles = useStyles();
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  const PasswordPattern = new RegExp(
    /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/
  );
  document.title = "Регистрация";
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordSubmit, setPasswordSubmit] = React.useState("");
  const [error, setError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [captcha, setCaptcha] = React.useState("");
  const [DataCaptcha, setDataCapctha] = React.useState<any>({
    passed: window.BASE_CAPTCHA === "0" ? true : false,
    color: "",
  });
  const [showpassword, setShowPassword] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [helperTextPassword, sethelperTextPassword] = React.useState("");

  const url = window.signUP_url;

  const handleClickShowPassword = () => {
    setShowPassword(!showpassword);
  };
  React.useEffect(() => {
    if (window.BASE_CAPTCHA === "1") getCaptha();
  }, []);

  const getCaptha = (color?: any) => {
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
    //
    axios
      .get(
        `${document.location.origin}/mobile~captcha?ident=${DataCaptcha.ident}&check=${captcha}`
      )
      .then((res) => {
        if (res.data.result === "1") {
          setDataCapctha({ ...DataCaptcha, passed: true, color: "Успешно." });
        } else {
          getCaptha("Повторите ещё раз.");
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
            <IconButton
              onClick={() => {
                getCaptha();
              }}
            >
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

  const handleChangeCheckBox = (event: any) => {
    setChecked(event.target.checked);
    if (error.search(event.target.id) !== -1) {
      setError(error.replace(event.target.id, ""));
    }
  };

  const handleClose = () => {
    setOpen(false);
    if (status === true) {
      window.history.back();
    }
  };

  const unableError = (event: any) => {
    const name = event.target.id;
    if (error.search(name) !== -1) {
      setError(error.replace(name, ""));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let errors = "";
    let SignUpData = {
      regcode: data.get("regcode"),
      login: data.get("login"),
      email: data.get("email"),
      password: data.get("password"),
    };

    if (!checked) {
      errors += "checkbox";
      setError(errors);
    }

    for (const [key, value] of Object.entries(SignUpData)) {
      if (value === "" || value === undefined) {
        if (key !== "MiddleName") {
          errors += key;
          setError(errors);
        }
      }
      if (key === "email" && pattern.test(email) === false) {
        errors += key;
        setError(errors);
      }
    }
    if(helperTextPassword !== ""){
      return
    }
    if (errors === "") {
      // services/RegistrationLK/create
      axios.post(url, JSON.stringify(SignUpData)).then((response) => {
        //
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

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>, passtoCheck?:any) => {
    let errorLocal: any = error;
    if (event.target.id === "password") {
      errorLocal.replaceAll("password", "");
      if (!PasswordPattern.test(event.target.value)) {
        errorLocal += "password";
        sethelperTextPassword(
          "По валидации пароля минимум 8 символов, 1 цифра, латинская буква верхнего и буква нижнего регистра."
        );
      } else {
        if(event.target.value !== passwordSubmit){
          sethelperTextPassword("Пароли должны совпадать!");
        }else{
          sethelperTextPassword("");
        }
      }
      setPassword(event.target.value);
    } else if(event.target.id === "passwordSubmit") {
      errorLocal.replaceAll("passwordSubmit", "");
      if (password !== event.target.value) {
        errorLocal += "passwordSubmit";
        console.log(errorLocal);
        
        sethelperTextPassword("Пароли должны совпадать!");
      } else {
        sethelperTextPassword("");
      }
      setPasswordSubmit(event.target.value)
    }
    // console.log(errorLocal);
    
    setError(errorLocal);
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
        <img src={"logo.png"} style={{ width: window.BASE_width_logo?window.BASE_width_logo:"45%" }} />
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 0.8 }}
          autoComplete="off"
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={12}>
              <Grow
                in={true}
                timeout={200}
                style={{ transformOrigin: "0 0 0" }}
              >
                <CssTextField
                  fullWidth
                  id="regcode"
                  label="Регистрационный код"
                  name="regcode"
                  error={error.search("regcode") !== -1}
                  helperText={
                    error.search("regcode") !== -1 ? "Заполните поле" : ""
                  }
                  onChange={unableError}
                />
              </Grow>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Grow
                in={true}
                timeout={200}
                style={{ transformOrigin: "0 0 0" }}
              >
                <CssTextField
                  fullWidth
                  id="login"
                  label="Логин"
                  name="login"
                  error={error.search("login") !== -1}
                  helperText={
                    error.search("login") !== -1 ? "Заполните поле" : ""
                  }
                  onChange={unableError}
                />
              </Grow>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Grow
                in={true}
                timeout={300}
                style={{ transformOrigin: "0 0 0" }}
              >
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
                    htmlFor="password"
                    sx={{ "&.Mui-focused": { color: "#3c5b77" } }}
                  >
                    Пароль
                  </InputLabel>

                  <OutlinedInput
                    type={showpassword ? "text" : "password"}
                    value={password}
                    fullWidth
                    id="password"
                    label="Пароль"
                    name="password"
                    error={helperTextPassword !== ""}
                    onChange={(e: any) => {
                      handleChangePassword(e,);
                      unableError(e);
                    }}
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
                  <FormHelperText>{helperTextPassword}</FormHelperText>
                </FormControl>
              </Grow>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Grow
                in={true}
                timeout={300}
                style={{ transformOrigin: "0 0 0" }}
              >
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
                    htmlFor="passwordSubmit"
                    sx={{ "&.Mui-focused": { color: "#3c5b77" } }}
                  >
                    Подтвердите пароль
                  </InputLabel>
                  <OutlinedInput
                    type={showpassword ? "text" : "password"}
                    fullWidth
                    value={passwordSubmit}
                    id="passwordSubmit"
                    label="Подтвердите пароль"
                    name="passwordSubmit"
                    error={helperTextPassword !== ""}
                    onChange={(e: any) => {
                      handleChangePassword(e);
                      unableError(e);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
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
              </Grow>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Grow
                in={true}
                timeout={250}
                style={{ transformOrigin: "0 0 0" }}
              >
                <CssTextField
                  value={email}
                  onChange={handleChange}
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  error={error.search("email") !== -1}
                  helperText={
                    error.search("email") !== -1 ? "Заполните поле" : ""
                  }
                />
              </Grow>
            </Grid>
            <Grid item xs={12}>
              <Grow
                in={true}
                timeout={500}
                style={{ transformOrigin: "0 0 0" }}
              >
                <FormControlLabel
                  style={{
                    color: error.search("checkbox") !== -1 ? "red" : "",
                  }}
                  control={
                    <Checkbox
                      style={{
                        color:
                          error.search("checkbox") !== -1 ? "red" : "#07579f",
                      }}
                      checked={checked}
                      onChange={handleChangeCheckBox}
                      id="checkbox"
                    />
                  }
                  label={
                    <div>
                      Я согласен на обработку персональных данных (настоящим
                      подтверждаю, что в случае регистрации мною третьих лиц,
                      предоставляю персональные данные с их согласия)
                    </div>
                  }
                />
              </Grow>
            </Grid>
            {window.BASE_CAPTCHA === "0" ? <></> : second}
          </Grid>
          <AlertDialogSlide
            setStatus={setStatus}
            message={message}
            status={status}
            open={open}
          />
          <Grow in={true} timeout={510} style={{ transformOrigin: "0 0 0" }}>
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
          </Grow>
          <Grow in={true} timeout={510} style={{ transformOrigin: "0 0 0" }}>
            <Grid container   justifyContent="space-between">
              <Grid item>
                <Link to={"/"} className={styles.link}>
                  Уже есть учётная запись? Войти
                </Link>

              </Grid>
              <Grid item>
              <Tooltip
                  arrow
                  title={
                    <>
                      <strong>
                        По вопросам регистрации в личном кабинете Вы можете
                        обратиться по телефону:
                      </strong>
                      <br />
                      - по договорам о размещении объектов: 435-69-31;
                      <br />
                      - по договорам аренды имущества муниципальной казны:
                      435-69-38;
                      <br />
                      - по договорам аренды нежилого фонда: 435-69-03,
                      435-69-02;
                      <br />- по договорам аренды земли : 435-69-29, 435-69-30.
                    </>
                  }
                >
                  <HelpIcon
                    fontSize="small"
                    style={{
                      color: "rgb(60, 91, 119)",
                      // fontSize: "100%",
                    }}
                  />
                </Tooltip>
              </Grid>
            </Grid>
          </Grow>
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
