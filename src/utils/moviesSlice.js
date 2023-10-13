import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    movieId: null,
    movieDesc: null,
    movieTitle: null,
    newTrailerVideo: null,
    isDescription: false,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addMovieDetails: (state, action) => {
      const { movieDesc, movieId, movieTitle } = action.payload;
      state.movieDesc = movieDesc;
      state.movieId = movieId;
      state.movieTitle = movieTitle;
    },
    addnewTrailerVideo: (state, action) => {
      state.newTrailerVideo = action.payload;
    },
    toggleIsDescription: (state, action) => {
      state.isDescription = !state.isDescription;
    },
    setIsDescription: (state, action) => {
      state.isDescription = false;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addMovieDetails,
  addnewTrailerVideo,
  toggleIsDescription,
  setIsDescription,
} = moviesSlice.actions;
export default moviesSlice.reducer;
