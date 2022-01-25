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

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(username, password));
    if (data) {
      setErrors(data);
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
    <div className='cyan-box'>
      <div className='head'>
        <img src={minewithahat} alt='minewithahat'></img>
        <div className='h1-div'>
          <h1>MineChef</h1>
        </div>
      </div>
      <div className='form-box'>
        <form onSubmit={onLogin}>
          <div className='grid'>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className='label-grid'>
              <label htmlFor='username/email'>Username or Email: </label>
              <label htmlFor='password'>Password: </label>
            </div>
            <div className='input-grid'>
              <input
                name='username/email'
                type='text'
                placeholder='Username'
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
          </div>
          <button className='form-button' type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
