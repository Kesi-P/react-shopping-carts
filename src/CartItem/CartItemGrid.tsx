import Grid from '@material-ui/core/Grid'
import { CartItemType } from '../App';
import Item from '../Item/item'

type Props ={
    currentProducts: CartItemType[]
}
const CartItemGrid: React.FC<Props> = ({currentProducts}) => {
    const handleAddToCart = () => null
    return(
        <Grid container spacing = { 3} >
            { currentProducts?.map(item => (
                <Grid item key={item.id} xs={12} sm={4}>
                    <Item item={item} handleAddToCart={handleAddToCart} />
                </Grid>
            ))}
            </Grid >
    )
}

export default CartItemGrid