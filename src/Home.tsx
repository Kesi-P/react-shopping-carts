import { useEffect, useState } from 'react'
//component
import Cart from './Cart/Cart'
import Drawer from '@material-ui/core/Drawer'
import LinearProgress from '@material-ui/core/LinearProgress'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'
import Pagination from '@material-ui/lab/Pagination';
import Item from './Item/item'
import { useDispatch, useSelector } from 'react-redux'
import { CartItemTypeReducer } from './Redux/reducers/productReducer'
//Style
import { Wrapper, StyledButton } from './App.styles'
import Grid from '@material-ui/core/Grid'
export type CartItemType = {
  id: number;
  category: string;
  image: string;
  price: number;
  title: string;
  amount: number;
  description: string;
}
const Home = () => {

  const [products, setProducts] = useState([])
  const [productPerPage, setProductsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setloading] = useState(false)

  useEffect(() => {
    async function getProducts() {
      setloading(true)
      let response = await fetch('https://fakestoreapi.com/products');
      let allproducts = await response.json();
      setProducts(allproducts);
      setloading(false);
    }

    getProducts();
  }, []);
  const lastProductIndex = productPerPage * currentPage;
  const firstPostIndex = lastProductIndex - productPerPage;

  const currentProducts: CartItemType[] = products.slice(firstPostIndex, lastProductIndex);
  const [cartOpen, setCartOpen] = useState(false)
   
  const dispatch = useDispatch()
  const handleAddToCart = (clickedItem: CartItemType) => {
    dispatch({ type: 'SET_PRODUCTS', payload: clickedItem })
  }
  const getTotalItemsReducer = (item: any[]) => {
    dispatch({ type: 'SELECTED_PRODUCT', payload: item })
  }
  // const handleRemoveFromCart = (id:number) => {
  //   dispatch({ type: 'REMOVE_SELECTED_PRODUCT' , payload: id})
  // }
  const handleRemoveFromCart = (removeItem: CartItemType) => {
    dispatch({ type: 'REMOVE_SELECTED_PRODUCT' , payload: removeItem})
  }
  
  //add products
  const allSelectedProducts: any = useSelector<CartItemTypeReducer>(
    (state) => state
  )

  const stateTotalProducts = allSelectedProducts.allProducts.currentProducts;  
  console.log(stateTotalProducts);
  useEffect(() => {

    getTotalItemsReducer(stateTotalProducts)

  }, [stateTotalProducts] );


  const amountProducts: any = useSelector<CartItemTypeReducer>(
    (state) => state
  )

  const stateamountProducts = amountProducts.amountProducts.currentProducts;
  
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0)
  

  if (loading) return <LinearProgress />;

  const pageNumbers = [];
  for (let i = 1; i <= Math.floor(products.length / productPerPage); i++) {
    pageNumbers.push(i);
  }
  const handleChange = (event: React.SyntheticEvent<EventTarget>, value: number): void => {
    setCurrentPage(value);
    event.preventDefault();
  };
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
        {currentProducts?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
      {/* <CartItemGrid currentProducts={currentProducts}/> */}

      <Pagination count={pageNumbers.length} page={currentPage} onChange={handleChange} color="primary" />


    </Wrapper>
  );
}


export default Home