import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeFromCart } from '../ducks/reducer';






class Shopping_Cart extends Component {
    render() {
        console.log(this.props)
        let cart = this.props.cart.map((e, i) => {
            return (
            <div className='product-container-cart' key={i}>
                
                <div className= 'product-cart'>
                <img src={e.photo} alt="product"/>
                </div>
                <p className='product'>{e.name}</p>
                <p className='price'>${e.price}</p>
                <div className='button-holder'>
                <button className='remove-from-cart' onClick={() => {
                    this.props.removeFromCart(e.id)}}>Remove from Cart</button>
                    <br/><br/>
                </div>
            </div>
            )
        })
        return (
            <div>
                
                
                {cart}

                <Link to= './Checkout' className='link'><button>Checkout</button></Link>
                <br/><br/>


            </div>
        );


    }
}

const mapStateToProps = state => {
    return{
        cart: state.cart
    }
}

export default connect(mapStateToProps, {removeFromCart})(Shopping_Cart);