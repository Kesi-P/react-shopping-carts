import { act } from '@testing-library/react';
import { ActionTypes } from '../containts/action-types'

import { CartItemType } from 'C:/React/react-shopping-cart/src/App'

export interface CartItemTypeReducer {
  currentProducts: {
    id: number,
    category: string,
    image: string;
    price: number;
    title: string;
    amount: number;
    description: string;
  }[]
}
const initialState = {
  currentProducts: [],
}

export const productReducer = (state: CartItemTypeReducer = initialState, action: { type: any, payload: any }) => {
  switch (action.type) {
    case ActionTypes.SET_PRODUCTS:
      

      // const isItemInCart = countId?.find((item) => item === action.payload.id)
      // if (isItemInCart) {
      //   console.log(countId);

      //   return {   ...state, currentProducts: countId.map((x,item) =>{
      //       if (item === action.payload.id){
      //         return [...state.currentProducts, { ...action.payload, amount:item.amount + 1 }]
      //       }
      //       else{
      //         return [...state.currentProducts, {item}]
      //       }
      //     })
      //   }


      // }else{
      return { ...state, currentProducts: [...state.currentProducts, { ...action.payload, amount: 1 }] };
    //}
    case ActionTypes.REMOVE_SELECTED_PRODUCT:
      console.log(action.payload)
      return { ...state, currentProducts: [...state.currentProducts, { ...action.payload, amount: - 1 }] };
    default:
      return state;
  }
}

export const productamountReducer = (state: CartItemTypeReducer = initialState, action: { type: any, payload: any }) => {
switch (action.type) {
  case ActionTypes.SELECTED_PRODUCT:

    const result:any[] = [];
    action.payload.reduce(function (res: any, value: any) {
      if (!res[value.id]) {
        res[value.id] = {
          id: value.id,
          amount: 0,
          category: value.category,
          description: value.description,
          image: value.image,
          price: value.price,
          title: value.title
        };
        result.push(res[value.id])
      }
      res[value.id].amount += value.amount;
      if(res[value.id].amount > 0){
        return res;
      }else{
        res[value.id].amount = 0
        return res;
      }
    }, {});
    //remove 0 amount
    for( var i = 0; i < result.length; i++){ 
        console.log(result[i].id)                           
      if ( result[i].amount === 0) { 
         result.splice(i, 1); 
          i--; 
      }
  }
    //console.log(result)
    return { ...state ,currentProducts:[...result]};

  default:
    return state;
}
}
