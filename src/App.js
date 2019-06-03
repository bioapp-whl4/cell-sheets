import React from 'react';
import router from './router'
import {HashRouter} from 'react-router-dom'


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