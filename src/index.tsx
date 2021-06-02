import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux'
import store from './Redux/store'
const client = new QueryClient()

ReactDOM.render(
<QueryClientProvider client={client}>
  <Provider store={store}>
  <App />
  </Provider>
  
</QueryClientProvider>
, document.getElementById('root')
);

 
