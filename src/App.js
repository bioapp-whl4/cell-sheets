import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import Register from "./Components/Register";
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          <Register />
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
