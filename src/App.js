import React from "react";
import router from "./router";
import { HashRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./App.scss";
import HeaderSearch from "./components/Search/HeaderSearch";
import GridContextProvider from "./components/GridContextProvider";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div>{router}</div>
      </HashRouter>
    </Provider>
  );
}

export default App;
