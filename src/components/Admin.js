import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import Footer from './Footer';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux'
import Update_Product from './Update_Product';
import New_Product from './New_Product';

// import New_Product from './New_Product';

class Admin extends Component {
    constructor(){
        super();
        this.state = {
            products: [],
            admin: false,
            id: '',
            item_name: '',
            price: '',
            photo: ''
        };
        this.deleteProduct = this.deleteProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
    }

    componentDidMount() {
        // this.adminCheck();
        // this.getShop();
        this.setState({admin: false});
        const getProducts = axios.get('/api/products');
        const adminCheck = axios.get('/api/user-data');
        Promise.all([
            adminCheck,
            getProducts
        ]).then(res2 => {
            console.log('Admin user', res2[0].data.user)
                // this.props.login(res2[0].data.user)
                // this.setState({
                //     adminId: res2.data.user.auth0_id
                // });
                if (res2[0].data.user){
                    if (res2[0].data.user.admin){
                        this.setState({
                            admin: true,
                            products: res2[1].data
                        });
                    } else {
                         this.props.history.push('/')
                    }
                }
        })
    }

    handleNameChange = (val) =>  {
        this.setState({item_name: val});
    }
    handlePriceChange = (val) => {
        this.setState({price: val});
    }
    handlePhotoChange = (val) => {
        this.setState({photo: val});
    }

    deleteProduct(id){
        axios.delete(`/api/product/${id}`).then(res => {
         this.setState({products: res.data})   
        });
    }

    changeProduct(id) {
        this.setState({id: ''});
        console.log('method hit')
        let newProducts = this.state.products.slice();
        let index = newProducts.findIndex(e => e.id === id);
        newProducts[index].update = true;
        this.setState({
            products: newProducts,
            id: index + 2
        });
    }

    updateProduct(product){
        axios.put(`/api/product/${product.id}`, product)
        .then(r => {
            this.setState({products: r.data});
        }).catch(err => console.log('Update Products Error-----', err));
    }

    render() {
        // eslint-disable-next-line
        let products = this.state.products.map((e, i) => (
            <div key={i}>
            {e.update ? (
                // eslint-disable-next-line
              <Update_Product product={e} updateState={this.updateProduct} photo={this.state.photo} item_name={this.state.item_name} id={this.state.id} price={this.state.price}
              handleName={this.handleNameChange} handlePrice={this.handlePriceChange} handlePhoto={this.handlePhotoChange}/>
            ) : (
              <div key={i}>
                <img src={e.photo} alt="product" />
                <p>{e.item_name}</p>
                <p>{e.price}</p>
                <button onClick={() => this.deleteProduct(e.id)}>
                  Delete
                </button>{" "}
                <button onClick={() => this.changeProduct(e.id)}>
                  Update
                </button>

                {/* <New_Product/> */}
              </div>
            )}
          </div>
        ))

        return (
        <div>
            <div>
                { products }
                {/* <New_Product/> */}
                {this.state.admin ? (
                    <div>
                       
                        <Link to='/'><button>Home</button></Link>
                        <Link to='/Admin/New_Product'><button>Add Product</button></Link>
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

export default withRouter(connect(null, mapDispatchtoProps)(Admin))