import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { Fragment } from 'react';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  
  const cartToggle = useSelector(state => state.ui.toggleCart);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);
  useEffect(() => {
    // const sendCartData = async () => {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: 'pending',
    //       title: 'Sending....',
    //       message: 'Sending cart data!'
    //     })
    //   )
    //   const response = await fetch('https://react-learning-7ec56-default-rtdb.firebaseio.com/cart.json', {
    //     method: "PUT",
    //     body: JSON.stringify(cart)
    //   });
    //   if(!response.ok) {
    //     throw new Error('Sending cart data fail!')
    //   }
    //   dispatch(
    //     uiActions.showNotification({
    //       status: 'success',
    //       title: 'Success!',
    //       message: 'Sending cart data successfully!'
    //     })
    //   )
    //   // const responseData = await response.json();
    // };

    if(isInitial) {
      isInitial = false;
      return;
    }

    // sendCartData().catch((err) => {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: 'error',
    //       title: 'Error!',
    //       message: 'Sending cart data failed!'
    //     })
    //   )
    // });
    if(cart.changed){
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);
  return (
    <Fragment>
      {
        notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )
      }
      <Layout>
        {cartToggle && <Cart />}
        
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
