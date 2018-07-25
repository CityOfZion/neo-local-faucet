import React from 'react';
import { render } from 'react-dom';

import App from './components/App/index';

render(
    <App config={window.__PRELOADED_STATE__}/>,
    document.getElementById('app')
);
