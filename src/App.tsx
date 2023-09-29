import "./App.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp/SignUp";
import { Route, Routes } from "react-router-dom";
import RestorePassword from "./RestorePassword";
import SignUpUMI from "./SignUp/SignUpUMI";

declare global {
  interface Window {
    signIn_url?: any;
    BASE_LK?: any;
    BASE_PASS_RECOVERY: any;
    signUP_url?: any;
    BASE_CAPTCHA?: any;
    BASE_SNILS_OR_FIO?: any;
    BASE_UMI?: any;
    ChangePassword_url?:any;
    RestorePassword_url?:any;
    BASE_margin_logo?:any;
    BASE_LINK_TEXT?:any;
  }
}

function App() {
  return (
    <div className="App">
      <Routes>
        {window.BASE_UMI === "0" ? (
          <Route path="/signup" element={<SignUp />} />
        ) : (
          <Route path="/signup" element={<SignUpUMI />} />
        )}
        <Route path="/restorepassword" element={<RestorePassword />} />
        <Route path="" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
