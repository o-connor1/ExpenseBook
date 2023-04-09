// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/auth/register";
import LogInForm from "./components/auth/login";

// import RegistrationFormfirst from './component/registerfirst'
// import Header from './component/header'
// import Loginform from './component/longin'
import Apps from "./Apps";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<RegistrationForm />} />
          <Route path="/login" exact element={<LogInForm />} />
          <Route path="/dashboard" exact element={<Apps />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
