import React, { useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import VisitorPage from './pages/VisitorPageFunctional';
import MainNavigation from './components/Navigation/MainNavigation';
import { isMobile } from './Utilities/detect-device';

const App = () => {
  
  useEffect(() => {

    let device = 'Desktop';
    if (isMobile.any()) {
      device = isMobile.any()[0];
    }

    fetch(
      'http://www.geoplugin.net/json.gp',
      { method: 'GET' }
    ).then(req => {
        return req.json();
    }).then(result => {
      const saveVisit = {

          query: `mutation {
            createVisit(ip: "${result.geoplugin_request}", device:"${device}"){
              _id
              ipAddress
              device
              createdAt
              updatedAt
            }
          }`
      };
       
      fetch('http://localhost:3003/api', {
          method: 'POST',
          body: JSON.stringify(saveVisit),
          headers: {
            'Content-Type': 'application/json'
          }
      }).then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }
        return res.json();
      }).then(resData => {
        console.log(resData)
      }).catch(err => {
        console.log(err);
      });
    }).catch(err => {
      console.log(err);
    });
  },[]);


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

export default App;
