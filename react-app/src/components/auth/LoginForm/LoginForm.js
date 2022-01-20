import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';
import './LoginForm.css'

const minewithahat = 'https://i.ibb.co/SsYtLQN/minewithahat.png';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
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
              <label htmlFor='email'>Email: </label>
              <label htmlFor='password'>Password: </label>
            </div>
            <div className='input-grid'>
              <input
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
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
