import React, { useState, useEffect } from 'react'
import axios from './axios';
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  // A snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    // if [], run once when the row loads, and don't run again

    // Have to format async function like this in useEffect
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl])
     
  return (
    <div className="row">
       <h2>{title}</h2>
      
      <div className="row__posters">
        {/* several row__poster(s) */}

        {movies.map(movie => (
          <img
            key={movie.id} // re-renders individual movies instead of whole row
            className="row__poster"
            src={`${base_url}${movie.poster_path}`}
            alt={movie.name}
          />  
        ))} 
      </div>
    </div>
  )
}

export default Row