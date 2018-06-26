import React, { Component } from 'react';
import { addToCart } from '../ducks/reducer';
import { connect } from 'react-redux';
// eslint-disable-next-line
import { Link } from 'react-router-dom';
// eslint-disable-next-line
import Header from './Header';
import axios from 'axios'
import '../styling/Products.css'



class Products extends Component {
    constructor(){
        super();

        this.state = {
            products: []
        };
    }

    componentDidMount(){
        this.getProducts();
    }

    getProducts(){
        axios.get('/api/products').then(res => {
            console.log(res.data)
            this.setState({
                products: res.data
            })
        })
    }

    render() {
        console.log(this.props)
        let products = this.state.products.map((item, i) => {
            return (
                 
               <div className= 'product-container' key={i}>
                
                    <div className='photo'>
                        <img src={item.photo} alt=""/>
                    </div>
                    <p className='product'>{item.item_name}</p>
                    <p>{item.price}</p>
                    <div className='button-holder'>
                        <button className='add-to-cart' onClick= {e => this.props.addToCart(e, item)}>Add to Cart</button>
                        <br/><br/>
                    </div>
                    

               </div>
            )
        })
    
    return (
        
        <div>
            {products}
        </div>
    )
    }
}

export default connect(null, {addToCart})(Products);