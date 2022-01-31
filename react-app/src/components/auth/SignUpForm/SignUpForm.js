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

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    const validEmail = (gE) => {
      if (gE.includes('@')) {
        if (gE.split('@')[0] && gE.split('@')[1].length > 3) return true;
      }
    }

    const errArr = [];

    username || errArr.push('* Please enter a username');
    validEmail(email) || errArr.push('* Please enter a valid email');
    password || errArr.push('* Please enter a password');
    password === repeatPassword || errArr.push('* Passwords do not match');

    if (errArr.length) {
      setErrors(errArr);
    } else {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].includes('username') && errArr.push('* That username is already in use')
          data[i].includes('email') && errArr.push('* That email is already in use')
        }
        setErrors(errArr);
      }
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
              <img
                className='happy-mine'
                src={minewithahat}
                alt='minewithahat'
                onClick={() => history.push('/')}
              ></img>
            </div>
            <div className='sign-up-page-h1-div'>
              <h1>MineChef</h1>
              <a href='https://github.com/Chloe-Baylock'>
                <img
                  className='sign-up-page-github-icon'
                  src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                ></img>
              </a>
            </div>
          </div>
          <div className='sign-up-page-box-bot'>
            <div className='sign-up-page-register-div'>
              <h1 className='sign-up-page-register-h1'>Register</h1>
            </div>
            <div className='sign-up-page-errors-div'>
              {errors.map((error, ind) => (
                <li className='sign-up-page-error-li' key={ind}>{error}</li>
              ))}
            </div>
            <div>
              <form onSubmit={onSignUp}>
                <div className='sign-up-page-form-group'>
                  <label id='sign-up-page-form-username' className='sign-up-page-form-label'  htmlFor='username'>Username</label>
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
                    type='text'
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
                <button className='button-comp' id='sign-up-page-form-submit' type='submit'>Sign Up</button>
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
