import * as ActionTypes from "../ActionTypes";

export const Favorites = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_FAVORITE_DISH:
      if (state.some((el) => el == action.payload)) {
        return state;
      } else {
        return state.concat(action.payload);
      }
    case ActionTypes.DELETE_FAVORITE_DISH:
      return state.filter((favorite) => favorite !== action.payload);

    default:
      return state;
  }
};
