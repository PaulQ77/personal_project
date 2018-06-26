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
        const {
            id,
            photo,
            item_name,
            price
        } = this.props.product;

        this.setState({
            id,
            photo,
            item_name,
            price
        });
    }



    updateProduct(){
        this.props.updateState({id: this.props.id, price: this.props.price, item_name: this.props.item_name, photo: this.props.photo});
    }
    
    render(){
        return (
            <div>
                <div className='photo'>
                        <img src={this.props.photo} alt={this.props.item_name}/>
                    </div>
                <br/><br/>
                <input placeholder= 'photo' type='text' onChange={e => this.props.handlePhoto(e.target.value)}/>
                <input placeholder= 'name' type='text' onChange={e => this.props.handleName(e.target.value)}/>
                <input placeholder= 'price' type='number' onChange={e => this.props.handlePrice(e.target.value)}/>
                <button onClick={() => this.updateProduct()}>Submit Changes</button>
                <br/><br/>
            </div>
        );
    }
    
}