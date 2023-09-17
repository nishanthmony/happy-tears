import './App.css';
import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Home } from './components/home';
import { SignUp } from './components/signup';
import { LogIn } from './components/login';
import { Error } from './components/notfound'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route exact path = '/' component = {Home} />
        <Route path = '/signup' component = {SignUp} />
        <Route path = '/login' component = {LogIn} />
        <Route component = {Error}/>
      </Switch>

      </BrowserRouter>
    </div>
  )
}
export default App;