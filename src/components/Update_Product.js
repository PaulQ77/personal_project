import React, { Component } from 'react';
import axios from 'axios';



export default class Update_Product extends Component{
    constructor(){
        super();

        this.state = {
            id: '',
            photo: '',
            item_name: '',
            price: ''
        };
        this.updateProduct = this.updateProduct.bind(this);
    }
    componentDidMount() {
        console.log(this.props)
        // const {
        //     id,
        //     photo,
        //     item_name,
        //     price
        // } = this.props.product;

        // this.setState({
        //     id,
        //     photo,
        //     item_name,
        //     price
        // });
    }

    handleChange(key, val){
        this.setState({
            [key]: val
        });
    }
    updateProduct(id){
        const updatedProducts = {
            photo: this.state.photo,
            name: this.state.name,
            price: this.state.price
        };
        axios.put(`/api/shop/${id}`, updatedProducts).then(r => {}).catch(error => {
            console.log(error);
        });
        this.props.updateState(this.state);
    }
    
    render(){
        return (
            <div>
                <input placeholder= 'photo' onChange={e => this.handleChange('photo', e.target.value)}/>
                <input placeholder= 'name' onChange={e => this.handleChange('name', e.target.value)}/>
                <input placeholder= 'price' onChange={e => this.handleChange('price', e.target.value)}/>
                <button onClick={() => this.updateProduct(this.state.id)}>Submit Changes</button>
            </div>
        );
    }
    
}