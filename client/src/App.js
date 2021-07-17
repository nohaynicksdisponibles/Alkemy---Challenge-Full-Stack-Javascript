import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./screens/Home"
import Login from "./screens/Login"
import Signup from "./screens/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
