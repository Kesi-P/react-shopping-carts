import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
//component

import LinearProgress from '@material-ui/core/LinearProgress'
import Paginations from './pagination'
//Style
import {Wrapper} from './App.styles'

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
  const [loading,setloading] = useState(false)

  //const currentProducts = useSelector<CartItemType[]>((state) => state.currentProducts)
  

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
 
  // const dispatch = useDispatch()
  // dispatch({type:'SET_PRODUCTS', payload: products})

  if (loading) return <LinearProgress />;

 
  return (
    <Wrapper>
      <Paginations currentProducts={products} />
    </Wrapper>
  );
}

export default App;
