import ProductItem from './ProductItem';
import classes from './Products.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
const DUMMY_DATA = [
  { id: 1, title: 'Test Item', description: "This is test description", price: 6 },
  { id: 2, title: 'Lorem ipsum 2', description: "This is test description", price: 6 },
  { id: 3, title: 'Dorlo sit amet', description: "This is test description", price: 6 }
];

const Products = (props) => {
  const dispatch = useDispatch()
  const addToCart = (item) => {
    dispatch(cartActions.addToCart(item));
  }
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
          DUMMY_DATA.map((item, key) => 
            (
              <ProductItem
                onAddToCart = {() => addToCart(item)}
                key={key}
                title={item.title}
                price={item.price}
                description={item.description}
              />
            )
          )
        }
        
      </ul>
    </section>
  );
};

export default Products;
