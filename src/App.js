import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import VisitorPage from './pages/VisitorPageFunctional';
import MainNavigation from './components/Navigation/MainNavigation';
import {useGetUserIP} from './hooks/getUserIP';

import {useSentVisit} from './hooks//getSentVisit';

const App = () => {

  const [userIP] = useGetUserIP();
  useSentVisit(userIP, data =>{
    console.log(data)
  });

  
  return (
    <BrowserRouter>
      <React.Fragment>
        <MainNavigation />
        <main className='main-content'>
          <Switch>
            <Redirect from='/' to='/dashbaord' exact />
            <Route path='/dashbaord' component={Dashboard} />

            <Route path='/visitors' component={VisitorPage} />
          </Switch>
        </main>
        <footer className='footer'>
          <div>&copy; KybDev 2019</div>
        </footer>
      </React.Fragment>
    </BrowserRouter>
  );
};

export default  React.memo(App);
