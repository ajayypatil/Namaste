import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieResults: null,
    movieNames: null,
    isLoading: null,
  },
  reducers: {
    toggleGptSearchView: (state, action) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },

    clearGptMovieResult: (state, action) => {
      state.movieNames = null;
      state.movieResults = null;
    },
    toggleIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleGptSearchView, addGptMovieResult, clearGptMovieResult,toggleIsLoading } =
  gptSlice.actions;
export default gptSlice.reducer;
