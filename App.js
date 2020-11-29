import { ConfigureStore } from "./redux/configureStore";
import { Loading } from "./components/LoadingComponent";
import Main from "./components/MainComponent";
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from "react-redux";
import React from "react";

//
const {persistor, store} = ConfigureStore();
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
      <Main />
      </PersistGate>
    </Provider>
  );
}
