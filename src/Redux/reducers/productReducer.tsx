import { act } from '@testing-library/react';
import { ActionTypes } from '../containts/action-types'

import { CartItemType } from 'C:/React/react-shopping-cart/src/App'

export interface CartItemTypeReducer {
  currentProducts: {id: number,
    category: string,
    image: string;
    price: number;
    title: string;
    amount: number;
    description: string;}[]
}
const initialState = {
  currentProducts: []
}

export const productReducer = (state: CartItemTypeReducer = initialState, action: { type: any, payload: CartItemType }) => {
  switch (action.type) {
    case ActionTypes.SET_PRODUCTS:
      const isItemInCart = state.currentProducts?.find((item) => item.id === action.payload.id)
      if (isItemInCart) {
        return {
          ...state, currentProducts: [...state.currentProducts].map(item =>{
            if (item.id === action.payload.id){
              return [...state.currentProducts, { ...action.payload, amount:item.amount + 1 }]
            }
            else{
              return [...state.currentProducts, { ...action.payload, amount:1 }]
            }
          })
        }
      }else{
      return { ...state, currentProducts: [...state.currentProducts, { ...action.payload, amount: 1 }] };
      }
    
    default:
      return state;
  }
}