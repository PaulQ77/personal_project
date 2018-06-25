import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Login from './Login';
import Logout from './Logout';
import { withRouter } from 'react-router-dom';
import { login, logout } from "../ducks/reducer";

class Footer extends Component{
    constructor(){
        super();
        this.state = {
            loggedIn: false,
            user: ''
        };
    }

    componentDidMount() {
        this.checkIfLoggedIn();
    }

    logInUser(){
        axios.get('/api/user-data').then(res => {
        
            if(res.data.user){
                this.props.login(res.data.user);
                this.setState({
                    user: res.data.user
                });
            }
        });
    }

    checkIfLoggedIn(){
        axios.get('/api/user-data').then(res => {
            if(res.data.user){
                this.setState({
                    loggedIn: true,
                    user: res.data.user
                });
            }
        });
    }

    rerender = () => {
        console.log('method hit')
        axios.get('/api/user-data').then(res => {
            console.log(res.data.user)
            if(!res.data.user){
                console.log('if statement hit')
                this.props.history.push('/');
            }
            this.setState({
                user: ''
            })
        })
    };

    login(){
        const callbackUri = encodeURIComponent(
            window.location.origin + '/callback'
        );
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/login?client=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${callbackUri}`;
    }

    render(){
        console.log(this.state.user);
        return (
            <div className = 'login-logout'>
                <div>
                    {this.state.user ? (
                        <div>
                            <Logout rerender={this.rerender} logout={this.logout}/>
                        </div>
                    ) : (
                        <div>
                            <Login login= {this.login}/>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapDispatchtoProps = {
    login,
    logout
};

export default withRouter(connect(null, mapDispatchtoProps)(Footer));