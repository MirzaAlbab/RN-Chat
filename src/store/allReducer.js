import {combineReducers} from 'redux';
import globalReducer from './globalReducer';
import LoginReducer from '../screen/Login/reducer/reducer';

export const allReducers = combineReducers({
  global: globalReducer,
  login: LoginReducer,
});
