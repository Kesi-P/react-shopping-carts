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
    allProducts: CartItemType[]
}
const Categorytemplate: React.FC<Props> = ({allProducts}) => {
    
    const [cartOpen, setCartOpen] = useState(false)
    const [productPerPage, setProductsPerPage] = useState(3)
    const [currentPage, setCurrentPage] = useState(1)
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

    //pagination
    const pageNumbers = [];
    for (let i = 1; i <= Math.floor(allProducts.length / productPerPage); i++) {
    pageNumbers.push(i);
    }
    const handleChange = (event:  React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        event.preventDefault();
        
      };
    return (
        <Wrapper>

        <Drawer anchor='left' open={cartOpen} onClose={() => setCartOpen(false)}>
          <Cart cartItems={stateamountProducts} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
        </Drawer>
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(stateamountProducts)} color='error'>
            <AddShoppingCartIcon />
          </Badge>
        </StyledButton>
        <Grid container spacing={3}>
          {allProducts?.map(item => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
        {/* <CartItemGrid currentProducts={currentProducts}/> */}
        {
             (pageNumbers.length > 1 )?
             <Pagination count={pageNumbers.length} page={currentPage} onChange={handleChange} color="primary" /> : null
            
        }
        
  
  
      </Wrapper>
    )
}

export default Categorytemplate;


