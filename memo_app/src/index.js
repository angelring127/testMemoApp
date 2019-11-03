import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LabelsContainer from './containers/LabelsContainer';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/modules';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';




// 리덕스 개발자도구 적용
const devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
// 스토어를 만든고 현재 값 확인 해봅시다 
const middlewares = [thunk];
const store = createStore(rootReducer,applyMiddleware(...middlewares));
console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
        <App />
        <LabelsContainer />
    </Provider>
, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
