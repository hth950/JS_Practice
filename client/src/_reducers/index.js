//combineReducer 를 이용하여 rootReducer 로 합쳐주는 기능
import { combineReducers } from 'redux';
import user from './user_reducer';

const rootReducer = combineReducers({
    user

})

export default rootReducer;