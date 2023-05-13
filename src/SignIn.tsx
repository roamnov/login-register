import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Slide,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import BigLogoAndPerosnal from "./BigLogoAndPerosnal.png";
import { styled } from "@mui/material/styles";
import { useStyles } from "./Styles";
import Grow from "@mui/material/Grow";

const theme = createTheme();

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#3c5b77",
  },

  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#3c5b77",
    },
  },
});
declare global {
  interface Window {
    signIn_url?: any;
    BASE_LK?: any;
    BASE_PASS_RECOVERY: any;
  }
}

export default function SignIn() {
  const styles = useStyles();
  document.title = "Вход";
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  const [error, setError] = React.useState<string | null>("");
  let url = window.signIn_url;
  const [showpassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [message, setMessage] = React.useState<any>("");

  const handleClickShowPassword = () => {
    setShowPassword(!showpassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClose = () => {
    setOpen(false);

  };

  const handlOpenDialog = () => {
    setMessage(
      <CssTextField
      margin="normal"
      required
      fullWidth
      id="login"
      label="Логин"
      name="login"
      autoComplete="login"
      autoFocus
      sx={{ mt: 0 }}
    />
    )
    setOpen(true);

  };

  const RestorePassword = (
    <Grow in={true} timeout={320} style={{ transformOrigin: '0 0 0' }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        style={{ width: "100%" }}
        spacing={1}
        sx={{ pt: 1 }}
      >
        <Grid item>
          <Link className={styles.link} to={""} onClick={handlOpenDialog}>
            {"Восстановить пароль"}
          </Link>
        </Grid>
      </Grid>
    </Grow>
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let LoginData = {
      UserName: data.get("login"),
      Password: data.get("password"),
    };

    axios.post(url, JSON.stringify(LoginData)).then((response) => {
      console.log(response.data);
      if (
        response.data["status"] !== undefined &&
        response.data["status"] !== "ok"
      ) {
        setError(response.data["status"]);
      } else {
        let href;
        if (window.BASE_LK === "1")
          href =
            response.data["browser"] +
            "?" +
            `Guid=${response.data["licguid"]}&stimWebSrv=${
              response.data["stimwebsrv"]
            }&from=${window.location.href.replaceAll("/", "@")}`;
        else
          href =
            response.data["browser"] +
            "?" +
            `authParam={'licGuid':'${response.data["licguid"]}','stimWebSrv':'${response.data["stimwebsrv"]}'}`;
        // let href = response.data['browser'] + "?"+ `authParam={'licGuid':'${response.data['licguid']}','stimWebSrv':'${response.data['stimwebsrv']}'}`
        // let href = response.data['browser'] + "?"+ `authParam={'licGuid':'${response.data['licguid']}','stimWebSrv':'${response.data['stimwebsrv']}'}`

        window.location.href = href;
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <img
              src={BigLogoAndPerosnal}
              style={{ marginLeft: "29%", width: "45%" }}
            />
            <Grow in={true} timeout={250} style={{ transformOrigin: '0 0 0' }}>
              <CssTextField
                margin="normal"
                required
                fullWidth
                id="login"
                label="Логин"
                name="login"
                autoComplete="login"
                autoFocus
                sx={{ mt: 0 }}
              />
            </Grow>
            <Grow in={true} timeout={330} style={{ transformOrigin: '0 0 0' }}>
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
                  autoComplete="current-password"
                  type={showpassword ? "text" : "password"}
                  fullWidth
                  id="password"
                  label="password"
                  name="password"
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
            </Grow>
            <Grow in={true} timeout={380} style={{ transformOrigin: '0 0 0' }}>
              <Grid item xs={12}>
                <FormHelperText error>
                  {error !== "" ? `${error}` : ""}
                </FormHelperText>
              </Grid>
            </Grow>
            {RestorePassword}
            <Grow in={true} timeout={380} style={{ transformOrigin: '0 0 0' }}>
              <Button
                style={{ backgroundColor: "#3c5b77", textTransform: "none" }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Войти
              </Button>
            </Grow>
            <Grow in={true} timeout={380} style={{ transformOrigin: '0 0 0' }}>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                  <Link className={styles.link} to={"/signup"}>
                    {"Нет учётной записи? Зарегистрируйтесь"}
                  </Link>
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
    </ThemeProvider>
  );
}
//#75ade0
