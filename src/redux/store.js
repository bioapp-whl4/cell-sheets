import { createStore, combineReducers } from "redux";
import reducer from "../redux/auth.reducer";
import {reducer as burgerMenu} from 'redux-burger-menu';

export default createStore(
  combineReducers({reducer, burgerMenu}),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
