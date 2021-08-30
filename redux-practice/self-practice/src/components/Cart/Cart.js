import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';


const Cart = (props) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch()
  const addToCart = (item) => {
    // console.log(item);
    dispatch(cartActions.addToCart(item));
  }
  const removeCart = (id) => {
    // console.log(item);
    dispatch(cartActions.removeCart(id));
  }
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {
          cartItems.map((item, key) => (
            <CartItem
              onAddToCart={() => addToCart(item)}
              onRemoveCart={removeCart.bind(null, item.id)}
              key={key}
              item={item}
            />
          ))
        }
      </ul>
    </Card>
  );
};

export default Cart;
