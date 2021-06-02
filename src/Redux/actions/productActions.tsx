import {ActionTypes} from '../containts/action-types'

export const setProduct = (products:any) => {
    return {
        type:ActionTypes.SET_PRODUCTS,
        payload: products
    }
}

export const selectedProduct = (product:any) => {
    return {
        type:ActionTypes.SELECTED_PRODUCT,
        payload: product
    }
}