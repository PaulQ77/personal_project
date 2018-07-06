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
        console.log('props id', this.props.id)
        this.props.updateState({id: this.props.product.id, price: this.props.productState.price, item_name: this.props.productState.item_name, photo: this.props.productState.photo});
    }
    
    render(){
        console.log(this.props)
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