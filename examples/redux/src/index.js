import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import App from './components';

// Action

const CHANGE_SELECTED_TAB = 'CHANGE_SELECTED_TAB';

function changeSelectedTab(selectedTab, tabNamespace) {
    return {
        type: CHANGE_SELECTED_TAB,
        tab: selectedTab,
        namespace: tabNamespace
    };
}

// Reducer

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

// Store

const store = createStore(tabsReducer);

// App

const ConnectedApp = connect(
    (state) => state,
    { changeSelectedTab }
)(App);

render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>,
    document.getElementById('app')
);