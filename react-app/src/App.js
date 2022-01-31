import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm/LoginForm';
import SignUpForm from './components/auth/SignUpForm/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UserList from './components/UserList/UserList';
import User from './components/User';
import Profile from './components/Profile/Profile'
import PostsPage from './components/Posts/PostsPage';
import { authenticate } from './store/session';
import PostPage from './components/Posts/PostPage/PostPage';
import HomePage from './components/HomePage/HomePage'
import Error404Page from './components/Error404Page/Error404page';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true}>
          <HomePage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UserList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/profile' exact={true} >
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path='/posts' exact={true} >
          <PostsPage />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId' exact={true} >
          <PostPage />
        </ProtectedRoute>
        <ProtectedRoute path='/' >
          <Error404Page />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
