import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { productListReducer } from './reducers/productReducers'
 
const reducer = {
    productList: productListReducer,
}

const store = configureStore({
    reducer,
    middleware: [thunk],
})
 
export default store