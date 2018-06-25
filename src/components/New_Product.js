import React, { Component } from 'react';
import axios from 'axios';
import Footer from './Footer';
import { Link } from 'react-router-dom'


export default class New_Product extends Component{
    constructor(){
        super();

        this.state= {
            admin: false,
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
        this.setState({admin: false});
        axios.get('/api/user-data').then(res2 => {
            // this.setState({ adminId: res.data[0].auth0_id });
            console.log(res2.data)
            if (res2.data.user){
                if(res2.data.user.admin){
                    this.setState({
                        admin: true
                    });
                }
            }
        }).catch(err => console.log(err));
        
    }

    addPhoto(files){

            //axios call to server to request hashed signature
            console.log('file', files)
            console.log('files', files[0])
            //This is the endpoint which will get your cloudinary credentials.
            axios.get('/api/upload').then(response => {
                console.log(response.data)
            
            //form data for signed uploads
            //Whenever uploading images make sure you define an instance of FormData and append your cloudinary credentials. 
            let formData = new FormData();
            formData.append("signature", response.data.payload.signature)
            console.log('API KEY------', process.env.REACT_APP_CLOUDINARY_API_KEY);
            formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
            formData.append("timestamp", response.data.payload.timestamp)
            formData.append("file", files[0]);
    
            // for(var pair of formData.entries()) {
            //     console.log(pair); 
            //  }
    
            //axios call to cloudinary using the URL set at top 
            //Post to your cloudinary database using the formData
                axios.post('https://api.cloudinary.com/v1_1/paulq/image/upload', formData).then(response => {
                    console.log(response.data);
    
                    // Setting state with the secure_url
                    this.setState({
                        photo: response.data.secure_url
                    })
                }).catch( err => {
                    console.log(err);
                }) 
            })
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
        axios.post('/api/product', obj).then(res => {
            this.setState({
                products: res.data
            });
            this.props.history.push('/admin');
        });
    }

    render(){
        console.log(process.env);
        let { photo, item_name, price } = this.state;
        return (
            <div>
                <div>
                    {this.state.admin ? (
                        <div>
                            <Link to= '/Admin'><button>Cancel</button></Link>
                            <input placeholder= 'photo' type='file' onChange={e => this.addPhoto(e.target.files)} required/>
                            <input placeholder= 'item name' onChange={e => this.addItemName(e.target.value)} required/>
                            <input placeholder= 'price' type= 'number' onChange={e => this.addPrice(e.target.value)} required/>
                            <button onClick={() => this.createProduct({
                                photo,
                                item_name,
                                price
                            })
                        }> Add Product </button> 
                        </div>
                    ) : (
                        <div>
                            <h6>Please Login Below</h6>
                            <Footer/>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}