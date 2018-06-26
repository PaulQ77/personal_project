import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styling/Header.css';
import {connect } from 'react-redux';
import Fully_StackedLogo from '../images/Fully_StackedLogo.png'

// import Login from './Login';
// import Shopping_Cart from './Shopping_Cart';
// import Products from './Products';
// import Admin from './Admin';

class Header extends Component {
    componentDidMount(){
        console.log(this.props)
    }
    render() {
        console.log('header props', this.props)
        return (
            <div className="header">
                <div className='logo-container'>
                    <img src={Fully_StackedLogo} className='fsl' alt=""/>
                    Fully Stacked
                </div>
                <div className="nav-bar">
                    <Link to='/' className= 'link'> Home</Link>
                    <Link to='/Products' className='link'>Products</Link>
                    <Link to='/Shopping_Cart' className='link'> Shopping Cart</Link>
                    
                    {!this.props.user ? <Link to='/Admin' className='admin'>Login</Link> : <Link to='/' className='admin'>Logout</Link>}
                    {this.props.user && this.props.user.admin === 'true' ? <Link to='/Admin' className='admin'>Admin</Link> : null}
                
                </div>
            
            
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Header);