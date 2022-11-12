import React from "react";
import "./Home.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="Home">
      <h2>HOME</h2>
      <ul>
        <li>
          <Link to="/new?userid=0001">ドラえもん</Link>
        </li>
        <li>
          <Link to="/new?userid=0002">のび太</Link>
        </li>
        <li>
          <Link to="/new?userid=0003">しずか</Link>
        </li>
        <li>
          <Link to="/new?userid=0004">ジャイアン</Link>
        </li>
        <li>
          <Link to="/new?userid=0005">スネ夫</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
