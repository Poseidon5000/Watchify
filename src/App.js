import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import MoviesInfo from "./components/MoviesInfo";
import MovieSummary from "./components/MovieSummary";
import MovieCard from "./components/MovieCard";
import Loading from "./components/Loading";
import Errorpage from "./components/Errorpage";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

// const querys = "avatar";

function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function fetchData() {
      try {
        if (query.length < 3){
          setMovies(tempMovieData);
      

          return;
        }
        setError("");
          setIsLoading(true);
          const request = await fetch(
            `http://www.omdbapi.com/?s=${query}&apikey=c7015181`
          );

          if (!request.ok)
            throw new Error("Something went wrong while fetching the data");

          const data = await request.json();
          console.log(data);

          if (data.Response === "False") throw new Error("No movies found");
          setMovies(data.Search);
        

      
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
      fetchData();},
    [query]
  );

  return (
    <>
      <Navbar
        movies={movies}
        setMovies={setMovies}
        query={query}
        setQuery={setQuery}
      />
      <main className="main">
        {isLoading && <Loading />}
        {error && <Errorpage error={error} />}
        {!isLoading && !error && (
          <MovieList
            movies={movies}
            setMovies={setMovies}
            watched={watched}
            setWatched={setWatched}
          />
        )}


        <MoviesInfo>
          <MovieSummary watched={watched} />
          <MovieCard watched={watched} setWatched={setWatched} />
        </MoviesInfo>
      </main>
    </>
  );
}

export default App;
