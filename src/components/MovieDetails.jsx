import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loading from "./Loading";

const key = `c7015181`;
const MovieDetails = ({
  selectedId,
  handleCloseMovie,
  handleAddMovie,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  useEffect(
    function () {
      async function getData() {
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
        );
        const data = await response.json();
        setMovie(data);
        setIsLoading(false);
      }
      getData();
    },
    [selectedId]
  );

  function addMovie() {
    const newMovie = {
      imdbID: selectedId,
      Title: movie.Title,
      Year: movie.Poster,
      Poster: movie.Poster,
      runtime: Number(movie.Runtime.split(" ")[0]),
      imdbRating: Number(movie.imdbRating),
      userRating: Number(userRating).toFixed(2),
    };

    handleAddMovie(newMovie);
    handleCloseMovie();
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleCloseMovie}>
              {" "}
              &larr;{" "}
            </button>
            <img src={movie.Poster} alt="poster of movie" />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie.imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {isWatched ? (
                <p>
                  You have watched this movie and rated it a
                  <span
                    style={
                      watchedUserRating <= 6
                        ? { color: "red" }
                        : { color: "gold" }
                    }
                  >
                    {" "}
                    {watchedUserRating}
                  </span>
                </p>
              ) : (
                <>
                  <StarRating setUserRating={setUserRating} />
                  {userRating && (
                    <button className="btn-add" onClick={addMovie}>
                      Add to list
                    </button>
                  )}
                </>
              )}
            </div>

            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring: {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
