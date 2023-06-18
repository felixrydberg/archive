import React, { Fragment, useState } from "react";
import Header from "./components/header/header";
import { Outlet } from "react-router-dom";

const App = () => {
  if (!localStorage.getItem("users"))
    localStorage.setItem("users", JSON.stringify([]));
  if (!localStorage.getItem("movies"))
    localStorage.setItem("movies", JSON.stringify([]));

  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("movies"))
  );

  return (
    <Fragment>
      <Header auth={auth} setAuth={setAuth} setUser={setUser}></Header>
      <Outlet
        context={{
          auth: auth,
          setAuth: setAuth,
          user: user,
          setUser: setUser,
          movies: movies,
          setMovies: setMovies,
        }}
      ></Outlet>
    </Fragment>
  );
};

export default App;
