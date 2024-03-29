import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import { ApolloProvider } from '@apollo/react-hooks';

import ApolloClient from 'apollo-boost';


import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: 'http://localhost:3003/api',
});



const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);



ReactDOM.render(<ApolloApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
