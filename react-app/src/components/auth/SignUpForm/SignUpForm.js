import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { login, signUp } from '../../../store/session';
import './SignUpForm.css'

const minewithahat = 'https://i.ibb.co/SsYtLQN/minewithahat.png';

const SignUpForm = () => {
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [pfp_url, setPfp_url] = useState('')
  const [description, setDescription] = useState('')

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const onDemo = async () => {
    let dUsername = 'Demo';
    let dPassword = 'password';

    let errors = await dispatch(login(dUsername, dPassword))
    if (errors) {
      console.log('in data conditional');
      let num = Math.floor(Math.random() * 10000);
      let dUsername = `Demo${num}`;
      let dEmail = `Demo${num}@aa.io`;
      let dPassword = 'password';
      dispatch(signUp(dUsername, dEmail, dPassword))
    }
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/profile' />;
  }

  return (
    <div className='sign-up-page-color'>
      <div className='sign-up-page-fill-space' />
      <div className='sign-up-page-flex-area'>
        <div className='sign-up-page-box'>
          <div className='sign-up-page-box-top'>
            <div className='sign-up-page-mine-with-a-hat'>
              <img src={minewithahat} alt='minewithahat'></img>
            </div>
            <div className='sign-up-page-h1-div'>
              <h1>MineChef</h1>
            </div>
          </div>
          <div className='sign-up-page-box-bot'>
            <div className='sign-up-page-register-div'>
              <h1 className='sign-up-page-register-h1'>Register</h1>
            </div>
            <div className='sign-up-page-errors-div'>
              {errors.map((error, ind) => (
                <li key={ind}>{error}</li>
              ))}
            </div>
            <div className='form-box'>
              <form onSubmit={onSignUp}>
                <div className='sign-up-page-form-group'>
                  <label className='sign-up-page-form-label' htmlFor='username'>Username</label>
                  <input
                    className='sign-up-page-form-input'
                    name='username'
                    type='text'
                    value={username}
                    onChange={updateUsername}
                  />
                </div>
                <div className='sign-up-page-form-group'>
                  <label className='sign-up-page-form-label' htmlFor='email'>Email</label>
                  <input
                    className='sign-up-page-form-input'
                    name='email'
                    type='email'
                    value={email}
                    onChange={updateEmail}
                  />
                </div>
                <div className='sign-up-page-form-group'>
                  <label className='sign-up-page-form-label' htmlFor='password'>Password</label>
                  <input
                    className='sign-up-page-form-input'
                    name='password'
                    type='password'
                    value={password}
                    onChange={updatePassword}
                  />
                </div>
                <div id ='sign-up-page-repeat' className='sign-up-page-form-group'>
                  <label className='sign-up-page-form-label' htmlFor='repeat'>Repeat Password</label>
                  <input
                    className='sign-up-page-form-input'
                    name='repeat'
                    type='password'
                    value={repeatPassword}
                    onChange={updateRepeatPassword}
                  />
                </div>
                <button className='button-comp' id='sign-up-page-form-submit' type='submit'>Sign In</button>
              </form>
            </div>
            <div className='sign-up-page-other-buttons'>
              <button
                id='sign-up-page-login'
                className='button-comp'
                onClick={() => history.push('/login')}
              >Log In</button>
              <button
                id='sign-up-page-demo'
                className='button-comp'
                onClick={() => onDemo()}
              >Demo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
