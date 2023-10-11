import React, { useState } from 'react'
import MovieCard from './MovieCard'
import MovieSummary from './MovieSummary';

const MoviesInfo = ({children}) => {
    const [isOpen2, setIsOpen2] = useState(true);

  
  return (
    <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen2((open) => !open)}
          >
            {isOpen2 ? "–" : "+"}
          </button>
          {isOpen2 && (
            <>
                {children}
            </>
          )}
       
        </div>
  )
}

export default MoviesInfo