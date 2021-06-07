import Button from '@material-ui/core/Button';
import { url } from 'inspector';
//type
import { CartItemType } from '../App';
import {Wrapper, Productimage} from './item.styles'

type Props ={
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
    <Wrapper>
        {/* <img src={item.image} alt={item.title} /> */}
        <Productimage className='product-image' style= {{ backgroundImage: `url(${item.image})` }}>
        </Productimage>
        <div>
            <h4 className='title'>{item.title}</h4>
            {/* <p>{item.description}</p> */}
            <h3>${item.price}</h3>
        </div>
        <Button variant="contained" onClick={() => handleAddToCart(item)}>Add to Cart</Button>
    </Wrapper>
)

export default Item;