import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FormControl,
  FormHelperText,
  Grow,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import BigLogoAndPerosnal from "./BigLogoAndPerosnal.png";
import { styled } from "@mui/material/styles";
import { useStyles } from "./Styles";
import { CssTextField } from "./SignIn";

const theme = createTheme();

export default function RestorePassword(props: any) {
  const styles = useStyles();
  let navigate = useNavigate();
  document.title = "Восстановление пароля";
  const [error, setError] = React.useState<string | null>("");
  // let url = window.signIn_url;
  let url =  `${document.location.origin}/mobile~services/ChangePasswordLK`;
  const [showpassword, setShowPassword] = React.useState<any>({
    newPassword: false,
    newPasswordRepeat: false,
  });
  const [token, setToken] = React.useState("");

  const handleClickShowPassword = (id: any) => {
    setShowPassword({ ...showpassword, [id]: !showpassword[id] });
  };

  React.useEffect(() => {
    const urlParams: any = new URLSearchParams(window.location.search);
    if (urlParams.has("token")) {
      setToken(urlParams.get("token"));
    } else {
      // navigate("/");
    }
  }, []);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let LoginData = {
      Password: data.get("newPassword"),
      token: token,
    };

    if (data.get("newPassword") === data.get("newPasswordRepeat")) {
      axios.post(url, JSON.stringify(LoginData)).then((response) => {});
    } else {
      setError("Указанные пароли не совпадают. Повторите попытку.");
    }
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
            <Grow in={true} timeout={200} style={{ transformOrigin: "0 0 0" }}>
              <FormControl
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": { borderColor: "#3c5b77" },
                  },
                  pb: 1,
                }}
              >
                <InputLabel
                  required
                  htmlFor="password"
                  sx={{ "&.Mui-focused": { color: "#3c5b77" } }}
                >
                  Новый пароль
                </InputLabel>
                <OutlinedInput
                  autoComplete="newPassword"
                  type={showpassword.newPassword ? "text" : "password"}
                  fullWidth
                  id="newPassword"
                  label="newPassword"
                  name="newPassword"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        id="newPassword"
                        aria-label="toggle password visibility"
                        onClick={() => {
                          handleClickShowPassword("newPassword");
                        }}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showpassword.newPassword ? (
                          <VisibilityOff id="newPassword" />
                        ) : (
                          <Visibility id="newPassword" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grow>
            <Grow in={true} timeout={250} style={{ transformOrigin: "0 0 0" }}>
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
                  Повторите пароль
                </InputLabel>
                <OutlinedInput
                  autoComplete="newPasswordRepeat"
                  type={showpassword.newPasswordRepeat ? "text" : "password"}
                  fullWidth
                  id="newPasswordRepeat"
                  label="newPasswordRepeat"
                  name="newPasswordRepeat"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        id="newPasswordRepeat"
                        aria-label="toggle password visibility"
                        onClick={() => {
                          handleClickShowPassword("newPasswordRepeat");
                        }}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showpassword.newPasswordRepeat ? (
                          <VisibilityOff id="newPasswordRepeat" />
                        ) : (
                          <Visibility id="newPasswordRepeat" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grow>
            <Grid item xs={12}>
              <FormHelperText error>
                {error !== "" ? `${error}` : ""}
              </FormHelperText>
            </Grid>
            <Grow in={true} timeout={280} style={{ transformOrigin: "0 0 0" }}>
              <Grid>
                <Button
                  style={{ backgroundColor: "#3c5b77", textTransform: "none" }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Сохранить
                </Button>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item>
                    <Link className={styles.link} to={"/"}>
                      {"Вернутся на страницу входа"}
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grow>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export {};
