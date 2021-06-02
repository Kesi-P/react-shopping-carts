import React from 'react'
import { CartItemType } from '../App';
//component
import Item from '../Item/item'
import Grid from '@material-ui/core/Grid'
import CartItemGrid from '../CartItem/CartItemGrid'
type Props ={
    menProducts: CartItemType[]
}
const forMen: React.FC<Props> = ({menProducts}) => {
    
    const handleAddToCart = () => null
    return (
    <div>
        
        <CartItemGrid currentProducts={menProducts} />
    </div>
    )
}

export default forMen;


