//combinereducer
import {combineReducers} from 'redux'
import {productReducer, productamountReducer} from './productReducer'

const reducers = combineReducers({
    allProducts: productReducer,
    amountProducts: productamountReducer
})

export default reducers
