import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n';
require("./libreries");

// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// disable ServiceWorker
// registerServiceWorker();
