import React from 'react';
import axios from 'axios';
import { logout } from "../ducks/reducer";
import { connect } from 'react-redux';


const Logout = props => {
    return (
        <div className= 'logout'>
            <button className= 'logout-button' 
                onClick={() => {
                    axios.post('/api/logout').then(res => {
                    props.logout();
                    props.rerender();
                    });
                }}> Logout </button>

        </div>
    );
};

const mapDispatchToProps = {
    logout
};

export default connect(null, mapDispatchToProps)(Logout);