import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styling/Header.css';
import {connect } from 'react-redux';

// import Login from './Login';
// import Shopping_Cart from './Shopping_Cart';
// import Products from './Products';
// import Admin from './Admin';

class Header extends Component {
    componentDidMount(){
        console.log(this.props)
    }
    render() {
        console.log('header props', this.props.user)
        return (
            <div className="header">
                <div className='logo'>
                    Site Name
                </div>
                <div className="nav-bar">
                    <Link to='/Products' className='link'>Products</Link>
                    <Link to='/Shopping_Cart' className='link'> Shopping Cart</Link>
                    <Link to='/' className= 'link'> Home</Link>
                    <Link to='/Admin' className='admin'>Login</Link>
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