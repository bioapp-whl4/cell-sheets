import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import Register from "./components/Register";
import { HashRouter } from "react-router-dom";
import GridContextProvider from './components/GridContextProvider'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          <Register />
          <GridContextProvider/>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
