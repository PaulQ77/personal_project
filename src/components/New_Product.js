import React, { Component } from 'react';
import axios from 'axios';
// import Footer from '../components/Footer';
import { Link } from 'react-router-dom'


export default class New_Product extends Component{
    constructor(){
        super();

        this.state= {
            id: '',
            photo: '',
            item_name: '',
            price: ''
        };
        this.createProduct = this.createProduct.bind(this);
    };
    componentDidMount() {
        this.adminCheck();
    }

    adminCheck(){
        axios.get('/api/Admin').then(res => {
            axios.get('/api/user-data').then(res2 => {
                this.setState({ adminId: res.data[0].auth0_id });

                if (res2.data.user){
                    if(res2.data.user.auth0_id === this.state.adminId){
                        this.setState({
                            admin: true
                        });
                    }
                }
            }).catch(err => console.log(err));
        });
    }

    addPhoto(val){
        this.setState({
            photo: val
        });
    }

    addItemName(val){
        this.setState({
            item_name: val
        });
    }

    addPrice(val){
        this.setState({
            price: val
        })
    }

    createProduct(obj){
        axios.post('/api/shop', obj).then(res => {
            this.setState({
                products: res.data
            });
            this.props.history.push('/admin');
        });
    }

    render(){
        let { photo, item_name, price } = this.state;
        return (
            <div>
                <div>
                    {this.state.admin ? (
                        <div>
                            <Link to= '/Admin'><button>Cancel</button></Link>
                            <input placeholder= 'photo' onChange={e => this.addPhoto(e.target.value)}/>
                            <input placeholder= 'item name' onChange={e => this.addItemName(e.target.value)}/>
                            <input placeholder= 'price' onChange={e => this.addPrice(e.target.value)}/>
                            <button onClick={() => this.createProduct({
                                photo,
                                item_name,
                                price
                            })
                        }> Add Product </button> 
                        </div>
                    ) : (
                        <div>
                            <h6>Not Authorized: Please Login Below</h6>
                            {/* <Footer/> */}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}