import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';
import './LoginForm.css'

const minewithahat = 'https://i.ibb.co/SsYtLQN/minewithahat.png';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async e => {
    e.preventDefault();

    const errArr = [];
    username || errArr.push('* Please enter a username or email');
    password || errArr.push('* Please enter your password');

    if(errArr.length === 0) {
      const data = await dispatch(login(username, password));
      if (data) {
        data[0][0]==='u' && errArr.push('* User or email not found');
        data[0][0]==='p' && errArr.push('* Incorrect Password');
        setErrors(errArr);
      }
    } else {
      setErrors(errArr);
    }

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div className='cover-nav'></div>
      <div className='flex-area'>
        <div className='box'>
          <div className='box-top'>
            <div className='mine-with-a-hat'>
              <img src={minewithahat} alt='minewithahat'></img>
            </div>
            <div className='h1-div'>
              <h1>MineChef</h1>
            </div>
          </div>
          <div className='box-bot'>
            <div className='login-errors-div'>
              {errors.map((error, ind) => (
                <li key={ind}>{error}</li>
              ))}
            </div>
            <div className='form-box'>
              <form onSubmit={onLogin}>
                <div className='input-flex'>
                  <input
                    autoFocus={true}
                    name='username/email'
                    type='text'
                    placeholder='Username or Email'
                    value={username}
                    onChange={updateUsername}
                  />
                  <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={updatePassword}
                  />
                </div>
                <button className='button-comp' id='form-button' type='submit'>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
