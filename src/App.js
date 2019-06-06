import React from 'react';
import router from './router';
import {HashRouter} from 'react-router-dom';
import store from "./redux/store";
import { Provider } from "react-redux";
import './App.scss'

import Filter from './Components/Filter'


function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          <Filter/>
          {router}
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
