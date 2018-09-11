import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(
   <BrowserRouter>
     <Router />
   </BrowserRouter>, 
   document.getElementById('root')
);
registerServiceWorker();
