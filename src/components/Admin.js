import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import Footer from './Footer';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux'
import Update_Product from './Update_Product';
import New_Product from './New_Product';
import { jsonArrayParam } from '../../node_modules/cloudinary/lib/utils';

// import New_Product from './New_Product';

class Admin extends Component {
    constructor(){
        super();
        this.state = {
            users: [],
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
        const join = axios.get('/api/join');
        Promise.all([
            adminCheck,
            getProducts,
            join
        ]).then(res2 => {
            console.log('Admin user', res2[0].data.user)
            if(res2[0].data.user){
                this.props.login(res2[0].data.user)
                // this.setState({
                //     adminId: res2.data.user.auth0_id
                // });
                if (res2[0].data.user){
                    if (res2[0].data.user.admin){
                        this.setState({
                            admin: true,
                            users: res2[2].data,
                            products: res2[1].data
                        });
                    } else {
                         this.props.history.push('/')
                    }
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
            // id: index + 1
        });
    }

    updateProduct(product){
        console.log('product--------', product);
        console.log('product id ----------', product.id)
        axios.put(`/api/products/${product.id}`, product)
        .then(r => {
            console.log('r-data------', r.data);
            this.setState({products: r.data});
        }).catch(err => console.log('Update Products Error-----', err));
    }

    render() {
        console.log('admin state', this.state)
        // eslint-disable-next-line
        let products = this.state.products.map((e, i) => (
            <div key={i}>
            {e.update ? (
                // eslint-disable-next-line
              <Update_Product product={e} productState={this.state} updateState={this.updateProduct} photo={this.state.photo} item_name={this.state.item_name} id={this.state.id} price={this.state.price}
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
                <br/><br/>

                {/* <New_Product/> */}
              </div>
            )}
          </div>
        ))
        let users = this.state.users.length ? this.state.users.map(user => 
        <div>
            <p>
                {JSON.stringify(user)}
            </p>
        </div>) : null;
        return (
        <div>
            <div>
                { users }
                { products }
                {/* <New_Product/> */}
                {this.state.admin ? (
                    <div>
                       
                        <Link to='/'><button>Home</button></Link>
                        <Link to='/Admin/New_Product'><button>Add Product</button></Link>
                        <Footer/>
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