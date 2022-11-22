import { configureStore } from "@reduxjs/toolkit";

import favFilmsReducer from "./reducers/favFilmsSlice";

export const store = configureStore({
  reducer: {
    favFilms: favFilmsReducer,
  },
});
