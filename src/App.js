import React from 'react';
import router from './router';
import {HashRouter} from 'react-router-dom';
import store from "./redux/store";
import { Provider } from "react-redux";
import './App.scss'
import SingleAdd from './components/SingleAdd'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          {router}
          <SingleAdd/>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
