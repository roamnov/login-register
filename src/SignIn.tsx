import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FormHelperText } from '@mui/material';

const theme = createTheme();

export default function SignIn() {
  document.title = "Вход";
  const [error, setError] = React.useState<string | null>("");
  let url= `${document.location.origin}/mobile~account`;
  let urlTest= "http://localhost:1317/mobile~account";
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let LoginData = {
      UserName: data.get('login'),
      Password: data.get('password'),
    };
    
    axios.post(url,JSON.stringify(LoginData)).then((response)=>{
        if(response.data['status'] !== undefined &&response.data['status']!== "ok" ){
          setError(response.data['status'])
          console.log(response.data)
        }
        else{
          window.location.href = "stimate.exe:" + response.data["params"]
        }
        
      }
    )};
  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Логин"
              name="login"
              autoComplete="login"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Grid item xs={12}>
            <FormHelperText error >
            {error !== "" ? `${error}` : ""}
            </FormHelperText>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Войти
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to={""} >
                  Забыли пароль?
                </Link>
              </Grid>
              <Grid item>
                <Link to={"/signup"} >
                  {"Нет аккаунта? Зарегистрируйтесь"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}