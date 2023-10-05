import React from 'react'
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from '../utils/moviesSlice';
import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';

const useNowPlayingMovies = () => {
    useEffect(() => {
        nowPlayingMovies();
      }, []);
    
      const dispatch = useDispatch();
    
    
      const nowPlayingMovies = async () => {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?page=1",
          API_OPTIONS
        );
        const json = await data.json();
        dispatch(addNowPlayingMovies(json.results));
      };
    }

export default useNowPlayingMovies;