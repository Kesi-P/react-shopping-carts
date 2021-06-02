
import React, { useState } from "react";
import { CartItemType } from './App'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//pages
import ForMen from './Category/Formen'
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


  currentProducts.map(item => (
    getCategory.push(item.category)
  ))

  //unige category
  const distinctCategory = Array.from(new Set(getCategory))
  console.log(distinctCategory);

  function handleChange(newValue: any) {
    //e.preventDefault();
    console.log(newValue);

  };

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

    console.log(women);



  //}

  return (
    <Router>
      <Paper square>
        <Tabs
          //value={value}
          indicatorColor="primary"
          textColor="primary"
          //onChange={handleChange}
          aria-label="disabled tabs example"
        >
          {distinctCategory.map((item: any) => (
            <Link to={`/${splitItem(item)}`} ><Tab label={item} /></Link>
          ))}
          {/* {summary(currentProducts)} */}
        </Tabs>
      </Paper>
      <Switch>

        <Route path="/men">
          <ForMen menProducts={men}/>
        </Route>
        <Route path="/topics">
          {/* <Topics /> */}
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

    </Router>
  )


}

export default Paginations;