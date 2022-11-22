import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favFilmIDs: [],
};

const favFilmsSlice = createSlice({
  name: "favFilms",
  initialState: initialState,
  reducers: {
    favFilm(state, action) {
      state.favFilmIDs.push(action.payload);
    },
    unfavFilm(state, action) {
      state.favFilmIDs = state.favFilmIDs.filter((id) => id !== action.payload);
    },
  },
});

export const { favFilm, unfavFilm } = favFilmsSlice.actions;
export default favFilmsSlice.reducer;
