import { applyMiddleware, combineReducers, createStore } from "redux";

import { Comments } from "../redux/reducers/comments";
import { Dishes } from "../redux/reducers/dishes";
import { Favorites } from "../redux/reducers/favorites";
import { Leaders } from "../redux/reducers/leaders";
import { Promotions } from "../redux/reducers/promotions";
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from "redux-logger";
import thunk from "redux-thunk";

// import { InitialFeedback } from "./forms";






// import { createForms } from "react-redux-form";





export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders,
      favorites: Favorites,
      // ...createForms({
      //   feedback: InitialFeedback,
      // }),
    }),
    composeWithDevTools(applyMiddleware(thunk, logger))
  );

  return store;
};
