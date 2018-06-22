const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';


let initialState = {
    cart: [],
    name: '',
    email: '',
    auth0_id: '',
    user: {}
};

export default function reducer(state = initialState, action){
    switch(action.type){
        case ADD_TO_CART:
        return { 
            ...state, 
            cart: [ 
                ...state.cart,
            {
                name: action.payload.item_name,
                price: action.payload.price,
                photo: action.payload.photo,
                id: action.payload.id

            }]
        };

        case REMOVE_FROM_CART:
        let newCart = state.cart.slice();

        newCart.splice(newCart.findIndex(e => e.id === action.payload), 1);
        return {
            cart: [ ...newCart]
        };

        case LOGIN:
        return{
            ...state,
            user: action.payload.user
        };

        case LOGOUT:
        return{
            ...state,
            name: '',
            email: '',
            auth0_id: '',
            cart: []
        };

        default: 
        return state;

    }
}

export function addToCart(e, product){
    e.preventDefault();
    console.log(product)
    return {
        type: ADD_TO_CART,
        payload: product
    }
}

export function removeFromCart(product_id) {
    return {
        type: REMOVE_FROM_CART,
        payload: product_id
    }
}

export function login(userData){
    console.log('reducer user', userData)
    return {
        type: LOGIN,
        payload: userData
    }
}

export function logout(){
    return {
        type: LOGOUT
    }
}