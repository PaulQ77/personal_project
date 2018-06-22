import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux'
import Update_Product from './Update_Product';
// import New_Product from './New_Product';

class Admin extends Component {
    constructor(){
        super();
        this.state = {
            products: [],
            admin: false,
            adminId: ''
        };
        this.deleteProduct = this.deleteProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
    }

    componentDidMount() {
        this.getShop();
        this.adminCheck();
    }

    getShop(){
        axios.get('/api/shop').then(res => {
            this.setState({
                products: res.data
            });
        });
    }

    adminCheck(){
        console.log('admin hit')
            axios.get('/api/user-data').then(res2 => {
                console.log('Admin user', res2)
                this.props.login(res2.data)
                this.setState({
                    adminId: res2.data[0].auth0_id
                });
                if (res2.data.user){
                    if (res2.data.user.auth0_id === this.state.adminId){
                        this.setState({
                            admin: true
                        });
                    }
                }
            }).catch(err => console.log(err));
    }

    deleteProduct(id){
        axios.delete(`/api/shop/${id}`).then(res => {
            this.getShop();
        });
    }

    changeProduct(id) {
        let newProducts = this.state.products.slice();
        let index = newProducts.findIndex(e => e.id === id);
        newProducts[index].update = true;
        this.setState({
            products: newProducts
        });
    }

    updateProduct(product){
        let newProducts = this.state.products;
        let index = newProducts.findIndex(e => e.product.id === product.product.id);
        newProducts[index] = product;
        newProducts[index].update = false;
        this.setState({
            products: newProducts
        });
    }

    render() {
        // eslint-disable-next-line
        let products = this.state.products.map((e, i) => (
            <div key={i}>
            {e.update ? (
                // eslint-disable-next-line
              <Update_Product product={e} updateState={this.updateProduct} />
            ) : (
              <div key={i}>
                <img src={e.photo} alt="product" />
                <p>{e.name}</p>
                <p>{e.price}</p>
                <button onClick={() => this.deleteProduct(e.id)}>
                  Delete
                </button>{" "}
                <button onClick={() => this.changeProduct(e.id)}>
                  Change
                </button>
              </div>
            )}
          </div>
        ))

        return (
        <div>
            <div>
                {this.state.admin ? (
                    <div>
                       
                        <Link to='/'><button>Home</button></Link>
                        <Link to='/admin/newProduct'><button>Add Product</button></Link>
                    </div>
                ) : (
                    <div className = 'not-admin'>
                        <h6>Please Login Below</h6>
                        <Footer/>{''}
                    </div>
                )}
            </div>
        
        </div>
        );
    }
}

const mapDispatchtoProps = {

        login

}

export default connect(null, mapDispatchtoProps)(Admin)