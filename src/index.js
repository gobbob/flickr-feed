import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';

import './icons';

import App from './App';
import './index.scss';

store.subscribe(() => {
    const state = store.getState();
    
    localStorage.setItem('feed', JSON.stringify(state));
});

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
    document.getElementById('root')
);
