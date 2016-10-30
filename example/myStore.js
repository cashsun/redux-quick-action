import { createStore, combineReducers, applyMiddleware } from 'redux';
import myReducers from './myReducers';


let myApp = combineReducers({
    user: myReducers,
    //article: articleReducers
    //...
});

export default createStore(myApp)