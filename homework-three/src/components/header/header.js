import { NavLink } from "react-router-dom";

const Header = (props) => {

  const logout = () => {
    props.setAuth(false)
    props.setUser({})
  }

  if (props.auth)
    return (
      <header>
        <NavLink className="nav-link" to="/">Home</NavLink>
        <NavLink className="nav-link" to="/movies">Movies</NavLink>
        <NavLink className="nav-link" to="/addMovies">Add Movie</NavLink>
        <button className="nav-link" onClick={logout}>Logout</button>
      </header>
    );
  else
    return (
      <header>
        <NavLink className="nav-link" to="/">Home</NavLink>
        <NavLink className="nav-link" to="/movies">Movies</NavLink>
        <NavLink className="nav-link" id="login" to="/login">Login</NavLink>
        <NavLink className="nav-link" to="/login/register">Register</NavLink>
      </header>
    );
};

export default Header;