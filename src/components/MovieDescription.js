import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { API_OPTIONS } from "../utils/constants";
import { addMovieDetails, addnewTrailerVideo } from "../utils/moviesSlice";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import Loader from "./Loader";

const MovieDescription = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { movieTitle } = useParams();
  useEffect(() => {
    searchMovieTMDB(movieTitle);
  }, []);

  const searchMovieTMDB = async (movieTitle) => {
    setIsLoading(true);
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movieTitle +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    const result = json.results;
    const movieFetched = result[0];
    const { original_title, overview, id } = movieFetched;
    dispatch(
      addMovieDetails({
        movieDesc: overview,
        movieId: id,
        movieTitle: original_title,
      })
    );
    setIsLoading(false);
  };
  const newMovieTitle = useSelector((store) => store.movies.movieTitle);
  const newMovieId = useSelector((store) => store.movies.movieId);
  const newMovieDesc = useSelector((store) => store.movies.movieDesc);
  

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <VideoTitle title={newMovieTitle} overview={newMovieDesc} />
          <VideoBackground movieId={newMovieId} />
        </div>
      )}
    </div>
  );
};

export default MovieDescription;
