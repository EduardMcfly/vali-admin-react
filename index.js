import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n';
require("./libreries");

import registerServiceWorker from './registerServiceWorker';
registerServiceWorker();

ReactDOM.render(<App />, document.getElementById('root'));
// disable ServiceWorker
