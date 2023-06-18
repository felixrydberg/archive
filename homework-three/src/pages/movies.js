import { useOutletContext, NavLink } from "react-router-dom";

const Movies = () => {
  const { user, movies, setMovies } = useOutletContext();
  const movieList = movies.map((movie, index) => {
    const url = `/movie/${movie.name}`;
    if (movie.user === user.email)
      return (
        <li key={index} className="img-display remove-btn-container">
          <button className="remove-btn" onClick={() => {removeIndex(index)}}>X</button>
          <img src={movie.img} alt="review poster"></img>
          <h1>{movie.name}</h1>
          <div>
            <h3>{movie.subTitle}</h3>
            <h3>{movie.desc}</h3>
          </div>

          <NavLink className="nav-link" to={url} state={movie}>
            Read More
          </NavLink>
        </li>
      );

    return (
      <li key={index} className="img-display">
        <img src={movie.img} alt="review poster"></img>
        <h1>{movie.name}</h1>
        <div>
          <h3>{movie.subTitle}</h3>
          <h3>{movie.desc}</h3>
        </div>

        <NavLink className="nav-link" to={url} state={movie}>
          Read More
        </NavLink>
      </li>
    );
  });

  const removeIndex = (index) => {
    const arr = [...movies];
    arr.splice(index, 1);
    setMovies(arr);
    localStorage.setItem('movies', JSON.stringify(arr));
  }

  return (
    <div className="movies">
      <h1>Movies</h1>
      <ul>{movieList}</ul>
    </div>
  );
};

export default Movies;
