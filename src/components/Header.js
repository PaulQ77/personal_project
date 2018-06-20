import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styling/Header.css';

import Login from './Login';
import Shopping_Cart from './Shopping_Cart';
import Products from './Products';
import Admin from './Admin';


export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className='logo'>
                    Site Name
                </div>
                <div className="nav-bar">
                    
                    <Link to= './Login' className='link'>Login</Link>
                    <Link to= './Products' className='link'>Products</Link>
                    <Link to= './Shopping_Cart' className='link'> Shopping Cart</Link>
                    <Link to= '/' className= 'link'> Home</Link>
                    <Link to= './Admin' className='admin'>Admin</Link>
                
                </div>
            
            
            </div>
        );
    }
}