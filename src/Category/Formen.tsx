import React from 'react'
import { CartItemType } from '../App';
//component
import CartItemGrid from '../CartItem/CartItemGrid'
import { useEffect, useState } from 'react'
//component
import Cart from '../Cart/Cart'
import Drawer from '@material-ui/core/Drawer'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'
import Pagination from '@material-ui/lab/Pagination';
import Item from '../Item/item'
import { useDispatch, useSelector } from 'react-redux'
import { CartItemTypeReducer } from '../Redux/reducers/productReducer'
//Style
import { Wrapper, StyledButton } from '../App.styles'
import Grid from '@material-ui/core/Grid'
type Props ={
    menProducts: CartItemType[]
}
const Formen: React.FC<Props> = ({menProducts}) => {
    
    const [cartOpen, setCartOpen] = useState(false)
    const dispatch = useDispatch()
    
    const amountProducts:any = useSelector<CartItemTypeReducer>(
        (state) => state
      )
    
    const stateamountProducts = amountProducts.amountProducts.currentProducts;
    const stateTotalProducts = amountProducts.allProducts.currentProducts; 
    useEffect(() => {

        getTotalItemsReducer(stateTotalProducts)
    
      }, [stateTotalProducts] );
      const getTotalItemsReducer = (item: any[]) => {
        dispatch({ type: 'SELECTED_PRODUCT', payload: item })
      }
    const handleRemoveFromCart = (removeItem: CartItemType) => {
        dispatch({ type: 'REMOVE_SELECTED_PRODUCT' , payload: removeItem})
      }
    const handleAddToCart = (clickedItem: CartItemType) => {
        dispatch({ type: 'SET_PRODUCTS', payload: clickedItem })
      }
    const getTotalItems = (items: CartItemType[]) =>
      items.reduce((ack: number, item) => ack + item.amount, 0)
    return (
        <Wrapper>

        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
          <Cart cartItems={stateamountProducts} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
        </Drawer>
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(stateamountProducts)} color='error'>
            <AddShoppingCartIcon />
          </Badge>
        </StyledButton>
        <Grid container spacing={3}>
          {menProducts?.map(item => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
        {/* <CartItemGrid currentProducts={currentProducts}/> */}
  
        {/* <Pagination count={pageNumbers.length} page={currentPage} onChange={handleChange} color="primary" /> */}
  
  
      </Wrapper>
    )
}

export default Formen;


