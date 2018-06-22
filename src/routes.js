import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Products from './components/Products';
import Shopping_Cart from './components/Shopping_Cart';
import Profile from './components/Profile';
import Admin from './components/Admin';
import Checkout from './components/Checkout';



export default (
    <div>
        <Route exact path='/' component={Home} />
        <Route path='/Login' component={Login}  />
        <Route path='/Products' component={Products}  />
        <Route path='/Shopping_Cart' component={Shopping_Cart} />
        <Route path='/Profile' component={Profile}  />
        <Route path='/Admin' component={Admin}  />
        <Route path='/Checkout' component={Checkout} />
    </div>
)
