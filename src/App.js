import './App.css';
import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Home } from './components/home';
import { SignUp } from './components/signup';
import { LogIn } from './components/login';
import { Error } from './components/notfound'
import { AddProducts } from './components/addProducts';
import { Cart } from './components/cart'
import { Support } from './components/support'
import {Cancellation} from './components/cancellation'
import {Terms} from './components/terms'
import {PrivacyPolicy} from './components/privacyPolicy'
import {Profile} from './components/profile'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route exact path = '/' component = {Home} />
        <Route path = '/signup' component = {SignUp} />
        <Route path = '/login' component = {LogIn} />
        <Route path = '/add-products' component = {AddProducts} />
        <Route path = '/cart' component = {Cart} />
        <Route path = '/support' component = {Support} />
        <Route path = '/cancellation' component = {Cancellation} />
        <Route path = '/terms-of-service' component = {Terms} />
        <Route path = '/privacy-policy' component = {PrivacyPolicy} />
        <Route path = '/profile' component = {Profile} />
        <Route component = {Error}/>
      </Switch>

      </BrowserRouter>
    </div>
  )
}
export default App;