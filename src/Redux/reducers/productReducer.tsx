import { ActionTypes } from '../containts/action-types'

import { CartItemType } from 'C:/React/react-shopping-cart/src/App'

type Props ={
    currentProducts: CartItemType[]
}
const initialState ={
    currentProducts: [
        {
            id:1,
  category:'string',
  image:'string',
  price:1,
  title:'string',
  amount:1,
  description:'string',

        }
    ]
}

export const productReducer = (state:Props = initialState,action: { type:any , payload:string}) => {
    switch (action.type) {
        case ActionTypes.SET_PRODUCTS:
            return state;    
        default:
            return state;
    }
}