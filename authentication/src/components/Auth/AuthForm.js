import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';
const AuthForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if(isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCjKrbo10eLPewJA2NOKlM_fS8pibf_q1I';
    }else{
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCjKrbo10eLPewJA2NOKlM_fS8pibf_q1I';
    }
    fetch(url,
    {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type' : 'application/json'
      }
    }).then(res => {
      setIsLoading(false);
      if(res.ok) {
        return res.json();
      }else {
        return res.json().then(data => {
          let errMessage = 'Authentication failed!';
          // if(data && data.error && data.error.message){
          //   errMessage = data.error.message;
          // }
          throw new Error(errMessage);
        });
      }
    })
    .then(data => {
      const expirationTime = new Date((new Date().getTime() + (+data.expiresIn * 1000)));
      // console.log(data);
      authCtx.login(data.idToken, expirationTime.toISOString());
      history.replace("/");
    })
    .catch(err => {
      alert(err.message);
    })
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailInputRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passwordInputRef} type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          {isLoading && <p>Send request....</p>}
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
