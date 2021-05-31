
import React from "react";
import { CartItemType } from './App'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//pages
import ForMen from './Category/Formen'
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
const Paginations: React.FC<Props> = ({currentProducts}) =>
{
    const getCategory:(string | number )[] =[]

    { currentProducts.map(item => (
        getCategory.push(item.category)
    ))}
    //unige category
    const distinctCategory = Array.from(new Set(getCategory))
    console.log(distinctCategory);
    
    function handleChange(newValue:any) {
        //e.preventDefault();
        console.log(newValue);
        
      };

    function splitItem(item:string) {
        return (
            item.split("'").shift()
        )
    } 
    return(
    <Router>
    <Paper square>
    <Tabs
      //value={value}
      indicatorColor="primary"
      textColor="primary"
      //onChange={handleChange}
      aria-label="disabled tabs example"
    >
    { distinctCategory.map((item:any)=> (
      <Link to={`/${splitItem(item)}`} ><Tab label={item} /></Link>
    ))} 
      
    </Tabs>
  </Paper>
  <Switch>
                  <Route path="/women">
                    <ForMen />
                  </Route>
                  <Route path="/topics">
                    {/* <Topics /> */}
                  </Route>
                  <Route path="/">
                    {/* <Home /> */}
                  </Route>
                </Switch>
  </Router>
    )
    
    
}

export default Paginations;