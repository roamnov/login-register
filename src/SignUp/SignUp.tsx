import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
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
import RefreshIcon from "@mui/icons-material/Refresh";
import { CssTextField } from "../SignIn";
import { useStyles } from "../Styles";
import { IMaskInput } from "react-imask";
import FormHelperText from "@mui/material/FormHelperText";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="000-000-000 00"
        definitions={{
          "#": /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

export default function SignUp() {
  const styles = useStyles();
  const SnilsMask = (snilsValue: string) => {
    return snilsValue.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, "$1-$2-$3-$4");
  };
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  const PasswordPattern = new RegExp(
    /(^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20}$)/
  );
  document.title = "Регистрация";
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [snils, setSnils] = React.useState("");
  const [inn, setInn] = React.useState();
  const [snilsError, setSnilsError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [captcha, setCaptcha] = React.useState("");
  const [helperTextPassword, sethelperTextPassword] = React.useState("");
  const [DataCaptcha, setDataCapctha] = React.useState<any>({
    passed: window.BASE_CAPTCHA === "0" ? true : false,
    color: "",
  });
  const [showpassword, setShowPassword] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const url = window.signUP_url;

  React.useEffect(() => {
    if (window.BASE_CAPTCHA === "1") getCaptha();
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showpassword);
  };

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

  const handleChangeCheckBox = (event: any) => {
    setChecked(event.target.checked);
    if (error.search(event.target.id) !== -1) {
      setError(error.replace(event.target.id, ""));
    }
  };

  const unableError = (event: any) => {
    const name = event.target.id;
    if (error.search(name) !== -1) {
      setError(error.replace(name, ""));
    }
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    let errorLocal: any = error;
    if (event.target.id === "password") {
      errorLocal = errorLocal.replaceAll("password", "");
      setPassword(event.target.value);
      if (!PasswordPattern.test(event.target.value)) {
        errorLocal += "password";
        sethelperTextPassword(
          "Пароль должен быть длиной от 6 до 20 символов, должен содержать цифры и хотя бы одну букву в нижнем регистре и верхнем регистре. Используется только латинский алфавит."
        );
      } else {
        sethelperTextPassword("");
      }
      // setPassword(event.target.value);
    } else {
      errorLocal.replaceAll("passwordSubmit", "");
      if (password !== event.target.value) {
        errorLocal += "passwordSubmit";
        sethelperTextPassword("Пароли должны совпадать!");
      } else {
        sethelperTextPassword("");
      }
    }
    setError(errorLocal);
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

  const handleChangeSNILS = (event: React.ChangeEvent<HTMLInputElement>) => {
    let clearSnils: any = event.target.value;
    clearSnils = clearSnils.replaceAll("-", "");
    clearSnils = clearSnils.replaceAll(" ", "");
    setSnils(event.target.value);
    if (validateSnils(clearSnils)) {
      setSnilsError("");
    }
  };

  const CapthaJSX = (
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

  const SnilsType = (
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
          htmlFor="snils"
          sx={{ "&.Mui-focused": { color: "#3c5b77" } }}
        >
          СНИЛС
        </InputLabel>
        <OutlinedInput
          required
          fullWidth
          value={snils}
          onChange={handleChangeSNILS}
          name="snils"
          id="snils"
          label="СНИЛС"
          error={error.search("snils") !== -1}
          inputComponent={TextMaskCustom as any}
        />
        <FormHelperText>{snilsError}</FormHelperText>
      </FormControl>
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

    let SignUpData = {
      login: data.get("login"),
      email: data.get("email"),
      password: data.get("password"),
      inn: inn,
      snils: snils,
    };

    if (!checked) {
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
      if (key === "snils" && snilsError !== "") {
        errors += key;
        setError(errors);
      }
    }

    if (errors === "") {
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
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  function validateSnils(snils: any) {
    var result = false;
    if (typeof snils === "number") {
      snils = snils.toString();
    } else if (typeof snils !== "string") {
      snils = "";
    }
    if (!snils.length) {
      setSnilsError("СНИЛС пуст");
    } else if (/[^0-9]/.test(snils)) {
      setSnilsError("СНИЛС может состоять только из цифр");
    } else if (snils.length !== 11) {
      setSnilsError("СНИЛС может состоять только из 11 цифр");
    } else {
      let sum: any = 0;
      for (var i = 0; i < 9; i++) {
        sum += parseInt(snils[i]) * (9 - i);
      }
      var checkDigit = 0;
      if (sum < 100) {
        checkDigit = sum;
      } else if (sum > 101) {
        checkDigit = sum % 101;
        if (checkDigit === 100) {
          checkDigit = 0;
        }
      }
      if (checkDigit === parseInt(snils.slice(-2))) {
        result = true;
      } else {
        setSnilsError("Неправильное контрольное число");
      }
    }

    return result;
  }

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
                  value={password}
                  id="password"
                  label="Пароль"
                  name="password"
                  onChange={handleChangePassword}
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
                <FormHelperText>{helperTextPassword}</FormHelperText>
              </FormControl>
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
                  htmlFor="passwordSubmit"
                  sx={{ "&.Mui-focused": { color: "#3c5b77" } }}
                >
                  Подтвердите пароль
                </InputLabel>
                <OutlinedInput
                  type={showpassword ? "text" : "password"}
                  required
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  fullWidth
                  id="passwordSubmit"
                  label="Подтвердите пароль"
                  name="passwordSubmit"
                  error={error.search("passwordSubmit") !== -1}
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
            </Grid>
            <SelectOrg error={error} setBackInfo={setInn} />
            {window.BASE_SNILS_OR_FIO === "1" ? (
              <SelectUser error={error} inn={inn} setBackInfo={setSnils} />
            ) : (
              SnilsType
            )}
            <Grid item xs={12}>
              <FormControlLabel
                style={{ color: error.search("checkbox") !== -1 ? "red" : "" }}
                control={
                  <Checkbox
                    style={{
                      color:
                        error.search("checkbox") !== -1 ? "red" : "#07579f",
                    }}
                    checked={checked}
                    id="checkbox"
                    onChange={handleChangeCheckBox}
                  />
                }
                label="Я согласен на обработку персональных данных (настоящим подтверждаю, что в случае регистрации мною третьих лиц, предоставляю персональные данные с их согласия)"
              />
            </Grid>
            {window.BASE_CAPTCHA === "0" ? <></> : CapthaJSX}
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
