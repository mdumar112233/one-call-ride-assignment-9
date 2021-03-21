import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import Header from './Components/Header/Header';
import SearchLocation from './Components/SearchLocation/SearchLocation';
import CreateAccount from './Components/CreateAccount/CreateAccount';
import { createContext, useState } from 'react';

export const UserContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
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
    </UserContext.Provider>
  )
}

export default App;
