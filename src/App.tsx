import './App.css';
import {useState} from "react"
import SignIn from './SignIn';
import SignUp from './SignUp/SignUp';
import {  Route,  Routes} from "react-router-dom"
import RestorePassword from './RestorePassword';
import SignUpUMI from './SignUp/SignUpUMI';

function App() {
  const [piNcode, setPinCode] = useState();
  return (
    <div className="App">
      
        <Routes>
          <Route  path='/signup' element= {<SignUpUMI/>}/>
          {/* <Route  path='/signup' element= {<SignUp/>}/> */}
          <Route path='/restorepassword' element={<RestorePassword/>}/>
          <Route path='' element={<SignIn/>}/>
        </Routes>
      
    </div>
  );
}

export default App;
