import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Movies from "./pages/movies";
import AddMovies from "./pages/addMovies";
import MovieDisplay from "./pages/movieDisplay";
import SignIn from "./pages/user/signin";
import SignUp from "./pages/user/signup";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Movies />}></Route>
          <Route path="movies" element={<Movies />}></Route>
          <Route path="addMovies" element={<AddMovies />}></Route>
        </Route>
        <Route path="/login" element={<App />}>
          <Route index element={<SignIn/>}></Route>
          <Route path="register" element={<SignUp />}></Route>
        </Route>
        <Route path="/movie" element={<App />}>
          <Route path="*" element={<MovieDisplay />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);
