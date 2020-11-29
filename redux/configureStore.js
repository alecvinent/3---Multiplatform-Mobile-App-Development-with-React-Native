import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistCombineReducers, persistStore } from "redux-persist";

import { Comments } from "../redux/reducers/comments";
import { Dishes } from "../redux/reducers/dishes";
import { Favorites } from "../redux/reducers/favorites";
import { Leaders } from "../redux/reducers/leaders";
import { Promotions } from "../redux/reducers/promotions";
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from "redux-logger";
import storage from 'redux-persist/es/storage';
import thunk from "redux-thunk";

//
export const ConfigureStore = () => {

  const config = {
    key: 'root',
    storage,
    debug: true
  };

  const store = createStore(
    persistCombineReducers(config, {
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders,
      favorites: Favorites,
    }),
    composeWithDevTools(applyMiddleware(thunk, logger))
  );

  const persistor = persistStore(store);

  return { persistor, store };
};
