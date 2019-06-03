import React from 'react';
import router from './router'
import {HashRouter} from 'react-router-dom'
import './App.scss'


function App() {
  return (
    <HashRouter>
    <div>
     
      {router}
    </div>
    </HashRouter>
  );
}
export default App;