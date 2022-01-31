import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login, signUp } from '../../../store/session';
import './LoginForm.css'

const minewithahat = 'https://i.ibb.co/SsYtLQN/minewithahat.png';

const LoginForm = () => {
  const history = useHistory();

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

    if (errArr.length === 0) {
      const data = await dispatch(login(username, password));
      if (data) {
        data[0][0] === 'u' && errArr.push('* User or email not found');
        data[0][0] === 'p' && errArr.push('* Incorrect Password');
        setErrors(errArr);
      }
    } else {
      setErrors(errArr);
    }

  };

  const onDemo = async () => {
    let dUsername = 'Demo';
    let dPassword = 'password';

    let errors = await dispatch(login(dUsername, dPassword))
    if (errors) {
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

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-page-color'>
      <div className='login-page-fill-space' />
      <div className='login-page-flex-area'>
        <div className='login-page-box'>
          <div className='login-page-box-top'>
            <div className='login-page-mine-with-a-hat'>
              <img src={minewithahat} alt='minewithahat'></img>
            </div>
            <div className='login-page-h1-div'>
              <h1 id='login-page-minechef'>MineChef</h1>
              <a href='https://github.com/Chloe-Baylock'>
                <img
                  className='login-page-github-icon'
                  src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                ></img>
              </a>
            </div>
          </div>
          <div className='login-page-box-bot'>
            <div className='login-page-errors-div'>
              {errors.map((error, ind) => (
                <li key={ind}>{error}</li>
              ))}
            </div>
            <div className='login-page-form-box'>
              <form onSubmit={onLogin}>
                <div className='login-page-input-flex'>
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
                <button className='button-comp' id='login-page-form-submit' type='submit'>Log In</button>
              </form>
            </div>
            <div className='login-page-other-buttons'>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
