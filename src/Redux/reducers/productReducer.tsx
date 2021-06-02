import { ActionTypes } from '../containts/action-types'

import { CartItemType } from 'C:/React/react-shopping-cart/src/App'

type Props ={
    currentProducts: CartItemType[]
}
const initialState ={
    currentProducts: []
}

export const productReducer = (state:Props = initialState,action: { type:any , payload:string}) => {
    switch (action.type) {
        case ActionTypes.SET_PRODUCTS:
            return {...state, currentProducts: [...state.currentProducts, action.payload]};    
        default:
            return state;
    }
}