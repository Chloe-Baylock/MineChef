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
    return <Redirect to='/' />;
  }

  return (
    <div className='sign-up-page-color'>
      <div className='sign-up-page-fill-space'></div>
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
                  {/* <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={updatePassword}
                  /> */}
                <button className='button-comp' id='sign-up-page-form-submit' type='submit'>Sign In</button>
              </form>
            </div>
            {/* <div className='login-page-other-buttons'>
              <button
                id='login-page-sign-up'
                className='button-comp'
                onClick={() => history.push('/sign-up')}
              >Sign Up</button>
              <button
                id='login-page-demo'
                className='button-comp'
                onClick={() => onDemo()}
              >Demo</button>
            </div> */}
          </div>
        </div>
      </div>




      {/* <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label>User Name</label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label>Repeat Password</label>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <input
          className='hide'
          type='text'
          name='pfp_url'
          onChange={e => setPfp_url(e.target.value)}
          value={pfp_url}
        ></input>
        <input
          className='hide'
          type='text'
          name='description'
          onChange={e => setDescription(e.target.value)}
          value={description}
        ></input>
        <button className='button-comp' type='submit'>Sign Up</button>
      </form> */}
    </div>
  );
};

export default SignUpForm;
