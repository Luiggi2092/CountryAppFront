import './App.css';
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import Form from './views/Form/Form';
import Detail from './views/Detail/Detail';
import { Route, useLocation} from "react-router-dom";
import NavBar from './components/NavBar/NavBar';


function App() {

   const location = useLocation();




  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar/>}
      <Route exact path="/" render={()=><Landing/>}/>
      <Route path="/home" render={()=><Home/>}/>
      <Route exact path="/create" render={()=><Form/>}/>
      <Route exact path="/detail/:id" render={()=> <Detail/> }/>



    </div>
  );
}

export default App;
