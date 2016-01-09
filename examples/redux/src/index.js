import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components';

const CHANGE_SELECTED_TAB = 'CHANGE_SELECTED_TAB';

const initialState = {
    tabs1: null,
    tabs2: null
};

function tabsReducer(state = initialState, action) {
    switch (action.type) {
    case CHANGE_SELECTED_TAB:
        return {
            ...state,
            [action.namespace]: action.tab
        };

    default:
        return state;
    }
}

const store = createStore(tabsReducer);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);