import React, { Component } from 'react';
// eslint-disable-next-line
import { Link } from 'react-router-dom';
// eslint-disable-next-line
import Header from './Header';
import axios from 'axios';
import { login } from '../ducks/reducer'
import { connect } from 'react-redux';
import homepage from '../images/homepage.jpg'
// import '../styling/Home.css';
// import 'slick-carousel/slick/slick';




class Home extends Component {
    componentDidMount(){
        axios.get('/api/user-data').then(response => {
            console.log('user Data', response)

            this.props.login(response.data.user)
        })
    }
    render() {
        return (
            <div> 
                
                <br/>
                
                <img src={homepage} alt=""/>

               
            </div>

        );
    }
}

const mapDispatchtoProps = {
    login
}

export default connect(null, mapDispatchtoProps)(Home)