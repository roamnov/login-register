import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import GosUslugiLogo from "./gos_logo_mobile.svg";
import { styled } from "@mui/material/styles";
import { useStyles } from "./Styles";
import Grow from "@mui/material/Grow";
import Captha from "./SignUp/Captha";

const theme = createTheme();

const Transition = React.forwardRef(function Transition(
  props,
  ref
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

export function removeParam(key, sourceURL) {
  var splitUrl = sourceURL.split("?"),
    rtn = splitUrl[0],
    param,
    params_arr = [],
    queryString = sourceURL.indexOf("?") !== -1 ? splitUrl[1] : "";
  if (queryString !== "") {
    params_arr = queryString.split("&");
    for (var i = params_arr.length - 1; i >= 0; i -= 1) {
      param = params_arr[i].split("=")[0];
      if (param === key) {
        params_arr.splice(i, 1);
      }
    }
    rtn = rtn + "?" + params_arr.join("&");
  }
  return rtn;
}

export function getURLparam(key) {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get(key);
  return param;
}

export function hasURLparam(key) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has(key);
}

export default function SignIn() {
  const navigate = useNavigate();
  const styles = useStyles();
  document.title = "Вход";
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  const [error, setError] = React.useState("");
  let url = window.signIn_url;
  let urlRestore = window.RestorePassword_url;
  const [showpassword, setShowPassword] = React.useState(false);
  const [infoTextForModal, setInfoTextForModal] = React.useState("");
  const [modalContent, setModalContent] = React.useState("0"); // 1- каптча ; 2-почта;3 - текст
  const [open, setOpen] = React.useState(false);
  const [emailRestore, setEmailRestore] = React.useState("");
  const [action, setAction] = React.useState("");
  const [org, setOrg] = React.useState();
  const [selectOrg, SetSelectOrg]=React.useState()
  const [message, setMessage] = React.useState({
    message: "",
    color: "green",
  });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (count === 3) {
      // window.history.back()
      if (window.BASE_UMI !== "1") {
        setOpen(true);
        setModalContent("1");
      }
    }
  }, [count]);

  React.useEffect(() => {
    if (hasURLparam("reason")) {
      const reason = getURLparam("reason");
      if (hasURLparam(reason)) {
        const errorFromUrl = getURLparam(reason);
        setError(errorFromUrl);
        removeParam("reason", window.location.href);
        let url = removeParam("reason", window.location.href);
        url = removeParam(reason, url);
        window.history.pushState(
          { additionalInformation: "Updated the URL with JS" },
          "Вход",
          url
        );
      }
    }
    if (hasURLparam("orgs")) {
      console.log(JSON.parse(atob(getURLparam("orgs"))));
      setOrg(JSON.parse(atob(getURLparam("orgs"))));
    }
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showpassword);
  };

  const EmailRestore = () => {
    return (
      <>
        <DialogTitle>
          {
            "Введите адрес электронной почты, указанный при регистрации вашей учетной записи"
          }
        </DialogTitle>
        <DialogContent>
          <Grid item>
            <CssTextField
              margin="normal"
              value={emailRestore}
              onChange={(e) => {
                setEmailRestore(e.target.value);
              }}
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{ mt: 1 }}
              error={CheckEmail()}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <div
            style={{
              color: message.color,
              marginLeft: "8px",
              marginRight: "2%",
            }}
          >
            {message.message}
          </div>
          <Button
            style={{
              backgroundColor: "#3c5b77",
              textTransform: "none",
            }}
            onClick={SendRestorePasswordClick}
            variant="contained"
            sx={{ mt: 1, mb: 1, minWidth: "108px" }}
          >
            Отправить
          </Button>
        </DialogActions>
      </>
    );
  };

  const BlockingCaptha = () => {
    return (
      <>
        <DialogTitle>
          {
            "Для подтверждения того, что Вы человек, а не программа, введите, пожалуйста, контрольные символы:"
          }
        </DialogTitle>
        <DialogContent>
          <Grid item>
            {modalContent === "1" ? (
              <Captha
                setCaptcha={(bool) => {
                  if (bool) {
                    setOpen(false);
                    setCount(0);
                  }
                }}
              />
            ) : null}
          </Grid>
        </DialogContent>
      </>
    );
  };

  const DefaultContent = () => {
    return (
      <>
        <DialogContent>
          <Grid item>{infoTextForModal}</Grid>
        </DialogContent>
      </>
    );
  };

  let contentForModalObj= {
    "1": <BlockingCaptha />,
    "2": <EmailRestore />,
    "3": <DefaultContent />,
  };

  const handleMouseDownPassword = (
    event
  ) => {
    event.preventDefault();
  };

  const handleClose = () => {
    if (modalContent !== "1") {
      setOpen(false);
    }
    switch (action) {
      case "NeedChangePassword":
        navigate("/signup");
        break;
    }
  };

  const handlOpenDialog = () => {
    setModalContent("2");
    setMessage({ ...message, message: "" });
    setOpen(true);
  };

  const CheckEmail = () => {
    if (emailRestore === "") return false;
    else return !pattern.test(emailRestore);
  };

  const SendRestorePasswordClick = () => {
    if (pattern.test(emailRestore) && emailRestore !== "") {
      let RestoreData = {
        Login: emailRestore,
      };

      axios.post(urlRestore, JSON.stringify(RestoreData)).then((response) => {
        if (response.data.status === "ok") {
          setMessage({ message: "Письмо отправлено.", color: "green" });
          setTimeout(() => {
            setOpen(false);
          }, 1000 * 10);
        } else {
          setMessage({ message: response.data.status, color: "red" });
        }
      });
    }
  };

  const RestorePassword = (
    <Grow in={true} timeout={320} style={{ transformOrigin: "0 0 0" }}>
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let LoginData = {
      UserName: data.get("login"),
      Password: data.get("password"),
    };
    if(hasURLparam("orgs")){
      if(selectOrg === undefined){
        setError("Выберите организацию.");
        return
      }
      axios.post(window.do_esia_org, JSON.stringify({ksp:selectOrg.ksp, snils: org.snils})).then((res)=>{
        CheckAnswerSubmit(res)
      })

    }else{
      axios.post(url, JSON.stringify(LoginData)).then((response) => {
        CheckAnswerSubmit(response)
      });
    }
  };

  const CheckAnswerSubmit = (response) =>{
    if (
      response.data["status"] !== undefined &&
      response.data["status"] !== "ok"
    ) {
      setError(response.data["status"]);
      if (response.data.action) {
        switch (response.data.action) {
          case "NeedChangePassword":
            setInfoTextForModal(
              response.data["status"] +
                " Для этого пройдите повторную регистрацию."
            );
            setOpen(true);
            setModalContent("3");
            break;
        }
        setAction(response.data.action);
      } else {
        setCount(count + 1);
      }
    } else {
      let href;
      if (window.BASE_LK === "1")
        href =
          response.data["browser"] +
          "?" +
          `Guid=${response.data["licguid"]}&stimWebSrv=${
            response.data["stimwebsrv"]
          }&from=${window.location.href
            .replace("#/", "")
            .replaceAll("/", "@")}`;
      else
        href =
          response.data["browser"] +
          "?" +
          `authParam={'licGuid':'${response.data["licguid"]}','stimWebSrv':'${response.data["stimwebsrv"]}'}`;
      // let href = response.data['browser'] + "?"+ `authParam={'licGuid':'${response.data['licguid']}','stimWebSrv':'${response.data['stimwebsrv']}'}`
      // let href = response.data['browser'] + "?"+ `authParam={'licGuid':'${response.data['licguid']}','stimWebSrv':'${response.data['stimwebsrv']}'}`

      window.location.href = href;
    }
  }

  const MainContent = () => {
    return (
      <>
        {window.do_esia_auth !== "" &&
        window.do_esia_auth !== undefined &&
        window.do_esia_auth !== null &&
        typeof window.do_esia_auth === "string" ? (
          <Grow in={true} timeout={380} style={{ transformOrigin: "0 0 0" }}>
            <Button
              style={{
                borderColor: "#3c5b77",
                textTransform: "none",
                color: "#3c5b77",
                height: "56px",
              }}
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              startIcon={
                // <img
                //   src={GosUslugiLogo}
                //   style={{ marginLeft: "", height: "24px" }}
                // />
                <img
                  style={{ marginLeft: "", height: "39px" }}
                  alt={""}
                  src={
                    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjAuNCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDE5NCAyMTMiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE5NCAyMTMiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8ZyBpZD0iTGF5ZXJfMTAiPgo8L2c+CjxnIGlkPSJMYXllcl85Ij4KPC9nPgo8ZyBpZD0iTGF5ZXJfOCI+CjwvZz4KPGcgaWQ9IkxheWVyXzciPgo8L2c+CjxnIGlkPSJMYXllcl82Ij4KPC9nPgo8ZyBpZD0iTGF5ZXJfNSI+CjwvZz4KPGcgaWQ9IkxheWVyXzQiPgo8L2c+CjxnIGlkPSJMYXllcl8zIj4KPC9nPgo8ZyBpZD0iTGF5ZXJfMiI+CjwvZz4KPGcgaWQ9ItCh0LvQvtC5XzEiPgoJPGcgaWQ9IkxheWVyXzExIj4KCQk8Zz4KCQkJPHBhdGggZmlsbD0iI0VGM0U1OCIgZD0iTTE2Mi44LDEwOC43aC02LjRjLTAuMiwwLTAuNCwwLjItMC40LDAuNHYyMC4zYy0xLjQsMC40LTIuOCwwLjYtNC40LDAuNmMtNC4yLDAtNS4yLTEuMy01LjItNi45di0xNAoJCQkJYzAtMC4yLTAuMi0wLjQtMC40LTAuNGgtNi40Yy0wLjIsMC0wLjQsMC4yLTAuNCwwLjR2MTQuN2MwLDkuMiwzLjEsMTIuNywxMSwxMi43YzQuNSwwLDkuNi0xLjIsMTIuNi0yLjMKCQkJCWMwLjEtMC4xLDAuMi0wLjIsMC4yLTAuM3YtMjQuOEMxNjMuMiwxMDguOSwxNjMsMTA4LjcsMTYyLjgsMTA4Ljd6Ii8+CgkJCTxwYXRoIGZpbGw9IiNFRjNFNTgiIGQ9Ik0yNy4yLDEwOC44aC02LjVjLTAuMiwwLTAuMywwLjEtMC4zLDAuM2MtMSw0LTMuMSwxMC44LTUuOSwxNy45TDgsMTA5Yy0wLjEtMC4xLTAuMi0wLjItMC4zLTAuMkgxLjEKCQkJCWMtMC4xLDAtMC4yLDAuMS0wLjMsMC4yYy0wLjEsMC4xLTAuMSwwLjIsMCwwLjNsOS44LDI2LjhjLTEsMi4xLTEuOSwzLjgtMi44LDUuNGMtMC43LDEuMi0xLjMsMi40LTEuOSwzLjcKCQkJCWMtMC4xLDAuMS0wLjEsMC4yLDAsMC4zYzAuMSwwLjEsMC4yLDAuMiwwLjMsMC4yaDcuMWMwLjEsMCwwLjMtMC4xLDAuMy0wLjJjMS4yLTIuMywyLjctNS41LDQuMS04LjhjNC4yLTkuOCw3LjUtMTksMTAtMjcuNAoJCQkJYzAtMC4xLDAtMC4yLTAuMS0wLjNDMjcuNCwxMDguOCwyNy4zLDEwOC44LDI3LjIsMTA4Ljh6Ii8+CgkJCTxwYXRoIGZpbGw9IiNFRjNFNTgiIGQ9Ik01MC41LDEyOS40YzAtMC4xLTAuMS0wLjItMC4yLTAuMmMtMC4xLDAtMC4yLDAtMC4zLDBjLTEuNiwwLjYtNC41LDEtNi41LDFjLTQuNSwwLTYuNi0xLjItNi42LTgKCQkJCWMwLTUuNSwwLjctOCw2LjYtOGMxLjcsMCwzLjIsMC4yLDUuMiwwLjhjMC4yLDAsMC4zLDAsMC40LTAuMmMwLjctMS40LDEuNi0zLjEsMi42LTUuMmMwLTAuMSwwLTAuMiwwLTAuM2MwLTAuMS0wLjEtMC4yLTAuMi0wLjIKCQkJCWMtMi42LTAuOC01LjctMS4zLTguNS0xLjNjLTkuMywwLTEzLjUsNC40LTEzLjUsMTQuM2MwLDEwLDQuMiwxNC41LDEzLjUsMTQuNWMyLjMsMCw3LTAuNSw5LjItMS40YzAuMi0wLjEsMC4zLTAuMywwLjItMC41CgkJCQlMNTAuNSwxMjkuNHoiLz4KCQkJPHBhdGggZmlsbD0iI0VGM0U1OCIgZD0iTTExMS40LDEwOC44aC02LjVjLTAuMiwwLTAuMywwLjEtMC4zLDAuM2MtMSw0LjEtMy4xLDEwLjgtNS45LDE3LjlMOTIuMiwxMDljLTAuMS0wLjEtMC4yLTAuMi0wLjMtMC4yCgkJCQloLTYuNmMtMC4xLDAtMC4yLDAuMS0wLjMsMC4yYy0wLjEsMC4xLTAuMSwwLjIsMCwwLjNsOS44LDI2LjhjLTEsMi4xLTEuOSwzLjgtMi44LDUuNGMtMC43LDEuMi0xLjMsMi40LTEuOSwzLjcKCQkJCWMtMC4xLDAuMS0wLjEsMC4yLDAsMC4zYzAuMSwwLjEsMC4yLDAuMiwwLjMsMC4yaDcuMWMwLjEsMCwwLjMtMC4xLDAuMy0wLjJjMS4yLTIuMywyLjctNS41LDQuMS04LjhjNC4xLTkuOCw3LjUtMTksMTAtMjcuNAoJCQkJYzAtMC4xLDAtMC4yLTAuMS0wLjNDMTExLjYsMTA4LjgsMTExLjUsMTA4LjgsMTExLjQsMTA4Ljh6Ii8+CgkJCTxwYXRoIGZpbGw9IiNFRjNFNTgiIGQ9Ik0xMzUuNCwxMDguN2gtMTguOWMtMC4yLDAtMC40LDAuMi0wLjQsMC40djI2LjNjMCwwLjIsMC4yLDAuNCwwLjQsMC40aDYuNGMwLjIsMCwwLjQtMC4yLDAuNC0wLjRWMTE1CgkJCQloOS45YzAuMSwwLDAuMy0wLjEsMC4zLTAuMmMwLjgtMS44LDEuNS0zLjcsMi4zLTUuNmMwLTAuMSwwLTAuMiwwLTAuM0MxMzUuNiwxMDguOCwxMzUuNSwxMDguNywxMzUuNCwxMDguN3oiLz4KCQkJPHBhdGggZmlsbD0iIzBGNjdCMSIgZD0iTTM0LjgsNjguM2MtOS4yLDAtMTIuOCw0LTEyLjgsMTQuMWMwLDEwLjMsMy42LDE0LjMsMTIuOCwxNC4zYzkuMywwLDEyLjktNCwxMi45LTE0LjMKCQkJCUM0Ny43LDcyLjMsNDQuMSw2OC4zLDM0LjgsNjguM3ogTTM0LjgsOTAuOWMtNC4yLDAtNS41LTEuMS01LjUtOC4zYzAtNy42LDEuNC04LjMsNS41LTguM2M0LjIsMCw1LjYsMC43LDUuNiw4LjMKCQkJCUM0MC40LDg5LjcsMzkuMSw5MC45LDM0LjgsOTAuOXoiLz4KCQkJPHBhdGggZmlsbD0iIzBGNjdCMSIgZD0iTTczLjMsODkuOGMwLTAuMS0wLjEtMC4yLTAuMi0wLjJjLTAuMSwwLTAuMiwwLTAuMywwYy0xLjYsMC42LTQuNSwxLTYuNSwxYy00LjUsMC02LjYtMS4yLTYuNi04CgkJCQljMC01LjUsMC42LTgsNi42LThjMS43LDAsMy4yLDAuMiw1LjIsMC44YzAuMiwwLDAuMywwLDAuNC0wLjJjMC43LTEuNCwxLjYtMy4xLDIuNi01LjJjMC0wLjEsMC0wLjIsMC0wLjNjMC0wLjEtMC4xLTAuMi0wLjItMC4yCgkJCQljLTIuNi0wLjgtNS43LTEuMy04LjUtMS4zYy05LjMsMC0xMy41LDQuNC0xMy41LDE0LjNjMCwxMCw0LjIsMTQuNSwxMy41LDE0LjVjMi4zLDAsNy0wLjUsOS4yLTEuNGMwLjItMC4xLDAuMy0wLjMsMC4yLTAuNQoJCQkJTDczLjMsODkuOHoiLz4KCQkJPHBhdGggZmlsbD0iIzBGNjdCMSIgZD0iTTEuMSw2OS4xYy0wLjIsMC0wLjQsMC4yLTAuNCwwLjR2MjYuM2MwLDAuMiwwLjIsMC40LDAuNCwwLjRoNi40YzAuMiwwLDAuNC0wLjIsMC40LTAuNFY3NS40aDkuOQoJCQkJYzAuMSwwLDAuMy0wLjEsMC4zLTAuMmMwLjgtMS44LDEuNS0zLjcsMi4zLTUuNmMwLTAuMSwwLTAuMiwwLTAuM2MtMC4xLTAuMS0wLjItMC4yLTAuMy0wLjJIMS4xeiIvPgoJCQkKCQkJCTxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMTAwLjUxNjciIHkxPSIyMTMuMDEzOCIgeDI9IjEwMC41MTY3IiB5Mj0iMC45MzA3IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgMjEzLjg4OTgpIj4KCQkJCTxzdG9wICBvZmZzZXQ9IjAuMzk3OSIgc3R5bGU9InN0b3AtY29sb3I6IzE0NjZBQyIvPgoJCQkJPHN0b3AgIG9mZnNldD0iMC42NTg2IiBzdHlsZT0ic3RvcC1jb2xvcjojRUY0MDU4Ii8+CgkJCTwvbGluZWFyR3JhZGllbnQ+CgkJCTxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSJ1cmwoI1NWR0lEXzFfKSIgZD0iTTE5Mi43LDEzM2MwLTAuMSwwLTAuMywwLTAuNGMwLTAuMiwwLTAuNSwwLjEtMC43CgkJCQljMC4zLTMuNywwLjUtOC4yLDAuNy0xMy40YzAtMC4xLDAtMC4zLDAtMC40YzAuMS0zLjUsMC4yLTcuMywwLjItMTEuMmMwLTMuOS0wLjEtNy43LTAuMi0xMS4yYzAtMC4xLDAtMC4zLDAtMC40CgkJCQljLTAuMi01LjEtMC40LTkuNy0wLjctMTMuNGMwLTAuMiwwLTAuNS0wLjEtMC43YzAtMC4xLDAtMC4zLDAtMC40YzAtMC40LTAuMS0wLjctMC4xLTEuMWMwLTAuMiwwLTAuMywwLTAuNAoJCQkJYy0wLjMtMy45LTAuNS02LjMtMC42LTYuNWMwLTAuNC0wLjEtMC44LTAuMS0xLjFjMC0wLjEsMC0wLjIsMC0wLjNjLTAuMS0wLjctMC4yLTEuMy0wLjQtMmMwLTAuMSwwLTAuMi0wLjEtMC4zCgkJCQljLTEuNy04LjEtNi4yLTE3LTExLjgtMjMuN2MtMi4yLTIuNi00LjUtNC45LTYuOS02LjdjLTAuMi0wLjItMy0yLjItNy40LTUuM2MtNS4xLTMuNS0xMi40LTguNC0yMC43LTEzLjIKCQkJCWMtMTQuNy04LjctMjcuOS0xNC43LTI5LjYtMTUuNWMwLDAsMCwwLDAsMGMwLDAsMCwwLDAsMGMtMC4xLDAtMC4xLTAuMS0wLjEtMC4xbDAsMGMwLDAsMCwwLDAsMGMtMy45LTEuNy04LjYtMi45LTEzLjctMy40CgkJCQljLTEtMC4xLTItMC4yLTMtMC4yYy0wLjksMC0xLjgtMC4xLTIuNy0wLjFjLTAuNSwwLTAuOSwwLTEuNCwwQzg3LjIsMSw4MC45LDIuMyw3NS45LDQuNmMwLDAsMCwwLDAsMAoJCQkJQzc1LjEsNC45LDYxLjgsMTEsNDYuNywxOS44aDBjLTAuMiwwLjEtMC40LDAuMi0wLjYsMC4zQzMwLjcsMjkuMywxOC41LDM4LjMsMTgsMzguN2MtMy44LDIuOC03LjIsNi40LTEwLjMsMTEKCQkJCUM3LDUwLjgsNyw1My40LDEwLDUzLjRoNy43YzMuMywwLDQuMS0yLDcuOC00LjdjNC4xLTMsMTIuMi05LDI3LTE3LjhDNjMuMiwyNC42LDczLjIsMTkuNyw3OCwxNy40YzAsMCwwLDAsMCwwCgkJCQljMC4xLDAsMC4yLTAuMSwwLjMtMC4xYzAsMCwwLjEsMCwwLjEtMC4xYzAsMCwwLjEsMCwwLjEtMC4xYzAuMSwwLDAuMi0wLjEsMC4yLTAuMWMwLDAsMCwwLDAsMGMwLjEsMCwwLjItMC4xLDAuMy0wLjEKCQkJCWMwLDAsMCwwLDAsMGMxLjItMC42LDItMC45LDItMC45YzMuNC0xLjUsOC4yLTIuNSwxMy4zLTIuNmMwLjMsMCwwLjcsMCwxLDBjMC4zLDAsMC43LDAsMSwwYzEuNSwwLDMsMC4xLDQuNCwwLjMKCQkJCWMzLjEsMC40LDUuOSwxLDguMiwyYzAuMiwwLjEsMC41LDAuMiwwLjcsMC4zYzAsMCwwLjEsMC4xLDAuNCwwLjJjMi4zLDEsMTQuNyw2LjksMjguMiwxNC44YzgsNC43LDE1LjEsOS40LDIwLDEyLjgKCQkJCWM0LjMsMyw2LjksNC45LDcsNWMxLjksMS40LDMuOCwzLjQsNS42LDUuNmM0LjUsNS44LDguMiwxMy43LDguOCwxOS44YzAsMC4xLDAuMywyLjUsMC42LDYuNmMwLDAuMywwLDAuNSwwLjEsMC44CgkJCQljMCwwLjIsMCwwLjQsMCwwLjZjMCwwLjQsMC4xLDAuNywwLjEsMS4xYzAsMC4xLDAsMC4zLDAsMC40YzAsMC4yLDAsMC41LDAuMSwwLjdjMCwwLjUsMC4xLDEsMC4xLDEuNWMwLDAuMywwLDAuNiwwLjEsMC45CgkJCQljMCwwLjEsMCwwLjIsMCwwLjJjMCwwLjQsMCwwLjcsMC4xLDEuMWMwLDAuMywwLDAuNSwwLDAuOGMwLjMsNS4yLDAuNSwxMS40LDAuNSwxNy45cy0wLjIsMTIuNy0wLjUsMTcuOWMwLDAuMywwLDAuNSwwLDAuOAoJCQkJYzAsMC40LDAsMC43LTAuMSwxLjFjMCwwLjEsMCwwLjIsMCwwLjJjMCwwLjMsMCwwLjYtMC4xLDAuOWMwLDAuNS0wLjEsMS0wLjEsMS41YzAsMC4zLDAsMC41LTAuMSwwLjdjMCwwLjEsMCwwLjMsMCwwLjQKCQkJCWMwLDAuNC0wLjEsMC43LTAuMSwxLjFjMCwwLjIsMCwwLjQsMCwwLjZjMCwwLjMsMCwwLjYtMC4xLDAuOGMtMC4zLDQuMS0wLjYsNi42LTAuNiw2LjZjLTAuNiw2LjEtNC4zLDE0LTguOCwxOS44CgkJCQljLTEuOCwyLjMtMy43LDQuMi01LjYsNS42Yy0wLjEsMC0yLjcsMi03LDVjLTQuOSwzLjQtMTIuMSw4LjEtMjAsMTIuOGMtMTMuNSw4LTI2LDEzLjgtMjguMiwxNC44Yy0wLjIsMC4xLTAuNCwwLjItMC40LDAuMgoJCQkJYy0wLjIsMC4xLTAuNSwwLjItMC43LDAuM2MtMi4zLDAuOS01LjEsMS42LTguMiwyYy0xLjQsMC4yLTIuOSwwLjMtNC40LDAuM2MtMC4zLDAtMC43LDAtMSwwcy0wLjcsMC0xLDAKCQkJCWMtNS4xLTAuMS05LjktMS0xMy4zLTIuNmMwLDAtMC43LTAuMy0yLTAuOWMwLDAsMCwwLDAsMGMtMC4xLTAuMS0wLjMtMC4xLTAuNC0wLjJjMCwwLDAsMCwwLDBjLTAuMS0wLjEtMC4yLTAuMS0wLjMtMC4yCgkJCQljLTAuMSwwLTAuMS0wLjEtMC4yLTAuMWMtMC4xLDAtMC4yLTAuMS0wLjMtMC4xYy0wLjEtMC4xLTAuMi0wLjEtMC40LTAuMmMwLDAtMC4xLDAtMC4xLDBjLTUuMS0yLjQtMTQuNy03LjItMjQuOS0xMy4yCgkJCQljLTE0LjktOC43LTIyLjktMTQuOC0yNy0xNy44Yy0zLjctMi43LTQuNS00LjctNy44LTQuN0gxMGMtMywwLTMsMi42LTIuMywzLjZjMy4xLDQuNiw2LjUsOC4yLDEwLjMsMTEKCQkJCWMwLjUsMC40LDEyLjcsOS40LDI4LjEsMTguNWMwLjgsMC41LDEuNiwxLDIuNSwxLjRoMGMxNC4zLDguMiwyNi42LDEzLjgsMjcuMywxNC4yYzAsMCwwLDAsMCwwYzQuOSwyLjIsMTEuMywzLjUsMTguMSwzLjcKCQkJCWMwLjQsMCwwLjksMCwxLjQsMGMwLjksMCwxLjgsMCwyLjctMC4xYzEsMCwyLTAuMSwzLTAuMmM1LjEtMC41LDkuOS0xLjcsMTMuNy0zLjRjMCwwLDAsMCwwLDBsMCwwYzAsMCwwLjEsMCwwLjEtMC4xCgkJCQljMCwwLDAsMCwwLDBjMCwwLDAsMCwwLDBjMS43LTAuOCwxNC45LTYuOSwyOS42LTE1LjVjOC4zLTQuOSwxNS42LTkuNywyMC43LTEzLjJjNC40LTMuMSw3LjItNS4xLDcuNC01LjMKCQkJCWMyLjQtMS44LDQuNy00LjEsNi45LTYuN2M1LjYtNi43LDEwLjEtMTUuNiwxMS44LTIzLjdjMC0wLjEsMC0wLjIsMC4xLTAuM2MwLjEtMC43LDAuMy0xLjQsMC40LTJjMC0wLjEsMC0wLjIsMC0wLjMKCQkJCWMwLjEtMC40LDAuMS0wLjgsMC4xLTEuMWMwLTAuMiwwLjMtMi42LDAuNi02LjVjMC0wLjEsMC0wLjMsMC0wLjRDMTkyLjcsMTMzLjcsMTkyLjcsMTMzLjMsMTkyLjcsMTMzIi8+CgkJCTxwYXRoIGZpbGw9IiNFRjNFNTgiIGQ9Ik03OS45LDEwOC43SDYwLjNjLTAuMiwwLTAuMywwLjEtMC40LDAuM2MtMC41LDguOS0yLjIsMTguNC00LjYsMjYuMmMwLDAuMSwwLDAuMiwwLjEsMC4zCgkJCQljMC4xLDAuMSwwLjIsMC4xLDAuMywwLjFoNi43YzAuMiwwLDAuMy0wLjEsMC4zLTAuMmMxLjktNiwzLjQtMTMuOCw0LTIwLjRoNi40djIwLjNjMCwwLjIsMC4yLDAuNCwwLjQsMC40aDYuNAoJCQkJYzAuMiwwLDAuNC0wLjIsMC40LTAuNHYtMjYuM0M4MC4zLDEwOC45LDgwLjEsMTA4LjcsNzkuOSwxMDguN3oiLz4KCQk8L2c+Cgk8L2c+CjwvZz4KPC9zdmc+Cg=="
                  }
                />
              }
              href={window.do_esia_auth}
            >
              Войти через Госуслуги
            </Button>
          </Grow>
        ) : (
          <div></div>
        )}

        <Grow in={true} timeout={250} style={{ transformOrigin: "0 0 0" }}>
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
        <Grow in={true} timeout={330} style={{ transformOrigin: "0 0 0" }}>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "#3c5b77" },
              },
              mt: 1,
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
      </>
    );
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
          <img
            src={BigLogoAndPerosnal}
            style={{ marginLeft: "", width: "45%" }} // navigator.userAgent.includes("Firefox")?"3%": "29%"
          />
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {!org ? (
              <MainContent />
            ) : (
              <Autocomplete
              disablePortal
              value={selectOrg}
              onChange={(e, newVal)=>{
                setError("")
                SetSelectOrg(newVal)
              }}
              id="orgs"
              getOptionLabel={(option) =>option.orgname}
              options={org.orgs}
              sx={{ width: 300 }}
              renderInput={(params) => <CssTextField {...params} label="Организация" />}
              />
            )}
            <Grow in={true} timeout={380} style={{ transformOrigin: "0 0 0" }}>
              <Grid item xs={12}>
                <FormHelperText error>
                  {error !== "" ? `${error}` : ""}
                </FormHelperText>
              </Grid>
            </Grow>
            {window.BASE_PASS_RECOVERY === "1" ? RestorePassword : <></>}
            <Grow in={true} timeout={380} style={{ transformOrigin: "0 0 0" }}>
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
            <Grow in={true} timeout={380} style={{ transformOrigin: "0 0 0" }}>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                  <Link className={styles.link} to={"/signup"}>
                    {window.BASE_LINK_TEXT}
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
          {/* {modalContent ? <BlockingCaptha /> : <EmailRestore />} */}
          {contentForModalObj[modalContent]}
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
//#75ade0
