/**
 * Created by daishun on 2016/9/18.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from './MainLayout/MainLayout';
import { createStore, applyMiddleware} from 'redux';
import {Provider } from 'react-redux';
import thunk from 'redux-thunk';
import todos from '../reducers/reducer';
import  'antd/dist/antd.css';
const finalCreateStore=applyMiddleware(thunk)(createStore)
const store = finalCreateStore(todos);
class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MainLayout />
            </Provider>
        );
    }
}
ReactDOM.render(<App />,document.getElementById("content"));
export default App;