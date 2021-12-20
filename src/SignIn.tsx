import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import BigLogoAndPerosnal from "./BigLogoAndPerosnal.png"
import "./Styles.ts";
import { styled } from '@mui/material/styles';
import { useStyles } from "./Styles";

const theme = createTheme();

export const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#3c5b77',
  },


  '& .MuiOutlinedInput-root': {
    
    '&.Mui-focused fieldset': {
      borderColor: '#3c5b77',
    },
  },
});




export default function SignIn() {
  const styles = useStyles();
  document.title = "Вход";
  const [error, setError] = React.useState<string | null>("");
  let url= `${document.location.origin}/mobile~account`;
  const [showpassword, setShowPassword] = React.useState(false);
  

  const handleClickShowPassword = () => {
    setShowPassword(!showpassword)
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  



  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let LoginData = {
      UserName: data.get('login'),
      Password: data.get('password'),
    };
    
    axios.post(url,JSON.stringify(LoginData)).then((response)=>{
      console.log(response.data)
        if(response.data['status'] !== undefined &&response.data['status']!== "ok" ){
          setError(response.data['status'])
         
        }
        else{
          let href = response.data['browser'] + "?"+ `authParam={'licGuid':'${response.data['licguid']}','stimWebSrv':'${response.data['stimwebsrv']}'}`
          window.location.href = href;
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
          
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <img src={BigLogoAndPerosnal} style={{ marginLeft:"29%", width:"45%"}}/>
            <CssTextField  margin="normal"
              required
              fullWidth
              id="login"
              label="Логин"
              name="login"
              autoComplete="login"
              autoFocus
              sx={{mt: 0}}
              />
             <FormControl  fullWidth variant="outlined" sx={{"& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": {   borderColor: "#3c5b77",  }}}} >
             <InputLabel required htmlFor="password" sx={{"&.Mui-focused": {   color: "#3c5b77" }}}>Пароль</InputLabel>
              <OutlinedInput   autoComplete="current-password"  type={showpassword ? 'text' : 'password'}   fullWidth id="password" label="password" name="password" 
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
            <Grid item xs={12}>
            <FormHelperText error >
            {error !== "" ? `${error}` : ""}
            </FormHelperText>
            </Grid>
            <Button
              style={{backgroundColor:"#3c5b77"}}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Войти
            </Button>
            <Grid container justifyContent="center" alignItems="center">
              
              <Grid item>
            
                <Link className={styles.link} to={"/signup"} >
                  {"Нет учётной записи? Зарегистрируйтесь"}
                </Link>
   
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}
//#75ade0
