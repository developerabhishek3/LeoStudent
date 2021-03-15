import { combineReducers } from 'redux';
// import UserReducer from './user';
import StudentReducer from './StudentDetails'
// import CategoryReducer from './category';
// import ProductReducer from './products';
// import MessageReducer from './inbox';
export default combineReducers({
    studentStore:StudentReducer,
    // userstore: UserReducer ,

    // productstore: ProductReducer,
    // categoryStore:CategoryReducer,
    // messageStore:MessageReducer
});