import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPassword = newPasswordInputRef.current.value;
     fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCjKrbo10eLPewJA2NOKlM_fS8pibf_q1I', {
       method: 'POST',
       body: JSON.stringify({
         idToken: authCtx.token,
         password: enteredPassword,
         returnSecureToken: false
       }),
       headers: {
        'Content-Type' : 'application/json'
       }
     }).then(res => {
        console.log(res);
        history.replace("/"); 
     });
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef} minLength="7"/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
