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
        <Route component={Home} exact path='/'/>
        <Route component={Login} path='/Login' />
        <Route component={Products} path='/Products' />
        <Route component={Shopping_Cart} path='/Shopping_Cart' />
        <Route component={Profile} path='/Profile' />
        <Route component={Admin} path='/Admin' />
        <Route component={Checkout} path='/Checkout'/>
    </div>
)
