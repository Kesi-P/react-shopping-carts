import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
//component
import Item from './Item/item'
import Cart from './Cart/Cart'
import Drawer from '@material-ui/core/Drawer'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'
import Pagination from '@material-ui/lab/Pagination';
//Style
import {Wrapper, StyledButton} from './App.styles'
import CartItem from './CartItem/CartItem'

export type CartItemType= {
  id:number;
  category:string;
  image:string;
  price:number;
  title:string;
  amount:number;
  description:string;
}


const App = () => {
  const [products, setProducts] = useState([])
  const [productPerPage, setProductsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading,setloading] = useState(false)
  
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
  function changePage(pagenumber:number){
    setCurrentPage(pagenumber)
  }
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])
  
  const getTotalItems = (items: CartItemType[]) =>
      items.reduce((ack:number, item) => ack + item.amount, 0)
  
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      //is the item alredy added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id)
      if (isItemInCart) {
        return prev.map(item => (
          item.id === clickedItem.id
          ? { ...item, amount: item.amount + 1} : item
        ))
      }
      //first time the item is added
      return [...prev, { ...clickedItem, amount: 1}]
    })
  }
  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => (
      prev.reduce((ack, item) => {
        if(item.id === id){
          if (item.amount === 1) return ack;
          return [...ack, {...item, amount: item.amount-1}]
        }else{
          return [...ack, item]
        }
      }, [] as CartItemType[])
    ))
  }

  if (loading) return <LinearProgress />;

  const pageNumbers = [];
  for(let i = 1; i <= Math.floor(products.length / productPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers)
  const handleChange = (event: React.SyntheticEvent<EventTarget>, value: number): void  => {
       setCurrentPage(value);
    event.preventDefault();
  };
  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
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
      
     <Pagination count={pageNumbers.length} page={currentPage} onChange={handleChange} color="primary" />
    </Wrapper>
  );
}

export default App;
