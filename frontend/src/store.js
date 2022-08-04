import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { productListReducer,productDetailsReducer } from './reducers/productReducers'
 
const reducer = {
    productList: productListReducer,
    productDetails: productDetailsReducer,
}

const store = configureStore({
    reducer,
    middleware: [thunk],
})
 
export default store