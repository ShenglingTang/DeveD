import { createStore, applyMiddleware } from "redux"; //applyMiddleware because we want to use the redux middleware thunk
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk"; //thunk is a middleware
import rootReducer from './reducers';

const initialstate = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialstate, composeWithDevTools(applyMiddleware(...middleware)));

export default store;