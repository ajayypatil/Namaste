import React from "react";
import MovieCard from "./MovieCard";
import "../MovieList.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleIsDescription } from "../utils/moviesSlice";

const MovieList = ({ title, movies }) => {
  const dispatch = useDispatch();
  return (
    <div className="px-6">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div id="scrollBar" className="flex overflow-x-scroll">
        <div className="flex ">
          {movies?.map((movie) => (
            <Link key={movie?.id} to={"/browse/" + movie.title} onClick={()=>{
               dispatch(toggleIsDescription())
            }}> 
            <MovieCard  posterPath={movie?.poster_path} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
