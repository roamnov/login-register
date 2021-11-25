import './App.css';
import SignIn from './SignIn';
import SignUp from './SignUp/SignUp';
import {  Route,  Routes} from "react-router-dom"

function App() {
  return (
    <div className="App">
      
        <Routes>
          <Route  path='/signup' element= {<SignUp/>}/>
          <Route path='' element={<SignIn/>}/>
        </Routes>
      
    </div>
  );
}

export default App;
