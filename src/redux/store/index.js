import {createStore} from 'redux';
import thunk from 'redux-thunk'; // For handling asynchronous actions
import reducers from '../reducers/index';

const store = createStore(reducers);

export default store;
