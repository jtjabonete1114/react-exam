import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import VisitorPage from './pages/VisitorPageFunctional';
import MainNavigation from './components/Navigation/MainNavigation';
import { isMobile } from './Utilities/detect-device';
import { createVisit } from './graphql/visits';

const App = () => {
  // const [fetchVisit] = useMutation(createVisit);

  // const [isPageLoad, setSetPageNo] = useState(false);

  // useEffect(() => {
  //   if (!isPageLoad) {
  //     let device = 'Desktop';
  //     if (isMobile.any()) {
  //       device = isMobile.any()[0];
  //     }
  //     fetch('http://www.geoplugin.net/json.gp', { method: 'GET' })
  //     .then(req => {
  //       return req.json();
  //     })
  //       .then(result => {
  //         const variables ={
  //           ip:result.geoplugin_request,
  //           device:device,
  //         }
  //         fetchVisit({ variables: variables })
  //         setSetPageNo(true);
  //       })
  //       .catch(err => {
  //         setSetPageNo(true);
  //       });
  //   }
  // },[]);


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
          <div>React Application</div>
        </footer>
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
