import { useLocation } from "react-router-dom";

const MovieDisplay = () => {
  const location = useLocation();
  const movie = location.state;
  return (
    <div className="movie-display">
      <div className="img-display">
        <img src={movie.img} alt="review poster"></img>
        <h1>{movie.name}</h1>
        <div>
          <h3>{movie.subTitle}</h3>
          <h3>{movie.desc}</h3>
        </div>
      </div>
    </div>
  );
};

export default MovieDisplay;
