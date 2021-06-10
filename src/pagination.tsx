
import React, { useState } from "react";
import { CartItemType } from './App'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//pages
import Categorytemplat from './Category/Categorytemplate'
import Home from './Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from 'react-router-dom';

type Props = {
  currentProducts: CartItemType[];
}
const Paginations: React.FC<Props> = ({ currentProducts }) => {
  const getCategory: (string | number)[] = []
  const [value, setValue] = useState(0);

  currentProducts.map(item => (
    getCategory.push(item.category)
  ))

  //unige category
  const distinctCategory = Array.from(new Set(getCategory))
  console.log(distinctCategory);

  function handleChange(newValue: number)  {
    setValue(newValue)
    
    

  };
  console.log('new');
  function splitItem(item: string) {
    return (
      item.split("'").shift()
    )
  }

  //function summary(typed: CartItemType[]) {
    const men: CartItemType[] = []
    const women: CartItemType[] = []
    const jew: CartItemType[] = []
    const elect: CartItemType[] = []

    for (var i: number = 0; i < currentProducts.length; i++) {
      switch (splitItem(currentProducts[i].category)) {
        case 'men':
          men.push(currentProducts[i])
          break;
        case 'women':
          women.push(currentProducts[i])
          break;
        case 'jewelery':
          jew.push(currentProducts[i])
          break;
        case 'electronics':
          elect.push(currentProducts[i])
          break;
        default:
          break;
      }


    }

  return (
    <Router>
      <Paper square>
        <Tabs
          value={value}
          // onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          {distinctCategory.map((item: any, key) => (
            <Link to={`/${splitItem(item)}`} style ={{textDecoration: 'none' }}><Tab label={item} onClick={() => handleChange(key)} /></Link>
          ))}
          {/* {summary(currentProducts)} */}
        </Tabs>
      </Paper>
      <Switch>

        <Route path="/men">
          <Categorytemplat allProducts={men}/>
        </Route>
        <Route path="/jewelery">
        <Categorytemplat allProducts={jew}/>
        </Route>
        <Route path="/electronics">
        <Categorytemplat allProducts={elect}/>
        </Route>
        <Route path="/women">
        <Categorytemplat allProducts={women}/>
        </Route>
        <Route path="/">
        <Home />
        </Route>
      </Switch>

    </Router>
  )


}

export default Paginations;