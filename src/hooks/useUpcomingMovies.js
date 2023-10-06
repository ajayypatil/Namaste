import React from 'react'
import { useDispatch } from 'react-redux';
import { addUpcomingMovies} from '../utils/moviesSlice';
import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';

const useUpcomingMovies = () => {
    useEffect(() => {
        popularMovies();
      }, []);
    
      const dispatch = useDispatch();
    
    
      const popularMovies = async () => {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?page=1",
          API_OPTIONS
        );
        const json = await data.json();
        dispatch(addUpcomingMovies(json.results));
      };
    }

export default useUpcomingMovies;