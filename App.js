import { ConfigureStore } from "./redux/configureStore";
import Main from "./components/MainComponent";
import { Provider } from "react-redux";
import React from "react";

const store = ConfigureStore();
export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
