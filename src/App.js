import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import SearchLocation from './Components/SearchLocation/SearchLocation';
import CreateAccount from './Components/CreateAccount/CreateAccount';

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
      <Route exact path='/'>
        <Home></Home>
      </Route>
      <Route path='/home'>
        <Home></Home>
      </Route>
      <Route path='/login'>
        <CreateAccount></CreateAccount>
      </Route>
      <Route path='/search'>
        <SearchLocation></SearchLocation>
      </Route>
      <Route path='*'>
        <NotFound></NotFound>
      </Route>
      </Switch>
    </Router>
  )
}

export default App;
