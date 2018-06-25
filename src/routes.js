import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Products from './components/Products';
import Shopping_Cart from './components/Shopping_Cart';
import Profile from './components/Profile';
import Admin from './components/Admin';
import Checkout from './components/Checkout';
import New_Product from './components/New_Product';



export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/Login' component={Login}  />
        <Route path='/Products' component={Products}  />
        <Route path='/Shopping_Cart' component={Shopping_Cart} />
        <Route path='/Profile' component={Profile}  />
        <Route exact path='/Admin' component={Admin}  />
        <Route path='/Admin/New_Product' component={New_Product}/>
        <Route path='/Checkout' component={Checkout} />
    </Switch>
)
