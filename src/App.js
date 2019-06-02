import React from "react";
import store from "./redux/store";
import Register from "./Componenets/Register";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Register />
      </div>
    </Provider>
  );
}

export default App;
