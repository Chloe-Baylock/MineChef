import React from 'react';
import { Redirect } from 'react-router-dom';

function HomePage() {

  return (<Redirect to='/profile'/>)
}

export default HomePage;