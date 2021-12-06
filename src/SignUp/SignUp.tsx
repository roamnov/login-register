import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
//import SelectOrg from './SelectOrg';
import SelectUser from './SelectFio';
import { Link } from 'react-router-dom';
import SelectOrg from './SelectOrg';
import AlertDialogSlide from './Alert';
import { TransitionProps } from '@mui/material/transitions';
import { Dialog, DialogContent, DialogContentText, Slide } from '@mui/material';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignUp() {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    document.title = "Регистрация";
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [snils, setSnils] = React.useState();
    const [inn, setInn] = React.useState();
    const [fio, setFio] = React.useState("")
    const [error, setError] = React.useState("");
    const [email, setEmail] = React.useState("");

    const url = `${document.location.origin}/mobile~registration/create`;
   

    


    const handleClose = () => {
      setOpen(false)
      if(status === true){window.history.back();}
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let errors= ""
        let checkbox = AllowData(event.currentTarget[10]);
     
        
        let SignUpData = {
            login: data.get('login'),
            email: data.get('email'),
            inn: inn,
            snils: snils,
            }
        
        if( checkbox === false){
          errors +="checkbox";
          setError(errors); 
        }

        for(const [key, value] of Object.entries(SignUpData)){

          if(value === "" || value === undefined ){
            errors +=key
            setError(errors);
          }
          if(key === "email" && pattern.test(email)=== false){
            errors +=key
            setError(errors);
          }
        }        
         
          
          if(errors === ""){
         
          axios.post(url, JSON.stringify(SignUpData)).then((response)=>{
            //console.log(response) 
            if(response.data["status"] === "ok"){
              setStatus(true)
              setMessage(response.data["message"])
            }else{
              setStatus(false)
              setMessage(response.data["status"])
              }/**/
            setOpen(true)
            
          })
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
      
    };

    const AllowData = (input:any)=>{ return input['checked'] }


  return (
    
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
          Регистрация
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={12}>
                <TextField required fullWidth  id="login" label="Логин" name="login"   error={error.search("login") !== -1} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField value={email} onChange={handleChange} required fullWidth  id="email" label="E-mail (Электронная почта куда придет пароль)" name="email" error={error.search("email") !== -1} />
              </Grid>
              <SelectOrg error={error} setBackInfo={setInn} />
              <SelectUser error={error} inn={inn} fio={fio} setBackInfo={setSnils}/>
              <Grid item xs={12}>
                <FormControlLabel
                  style={{ color: error.search("checkbox") !== -1?"red":""}}
                  control={<Checkbox style={{ color: error.search("checkbox") !== -1?"red":""}}  value="allowPersonalData" color="primary" />}
                  label="Я согласен на обработку персональных данных(настоящим подтверждаю, что в случае регистрации мною третьих лиц, предоставляю пресональные данные с их согласия)"
                />
              </Grid>
            </Grid>
            <AlertDialogSlide setStatus={setStatus} message={message} status={status} open={open}/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Зарегистрироваться
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/"}>
                  Уже есть аккаунт? Войти
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

if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

*/