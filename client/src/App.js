import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./screens/Home"
import Login from "./screens/Login"
import Signup from "./screens/Signup";
import CrearOp from './screens/Crear';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/create" component={CrearOp}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
