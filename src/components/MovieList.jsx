import React, { useState } from 'react'

const MovieList = ({movies, handleSelectMovie}) => {
    const [isOpen1, setIsOpen1] = useState(true);
  return (
    <>
        <button
      className="btn-toggle"
      onClick={() => setIsOpen1((open) => !open)}
    >
      {isOpen1 ? "–" : "+"}
    </button>
    {isOpen1 && (
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <li key={movie.imdbID} onClick={()=> handleSelectMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
              <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    )}
    </>
  )
}

export default MovieList