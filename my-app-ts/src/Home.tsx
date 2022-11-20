import React from "react";
import "./Home.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const Home = () => {
  return (
      <div className="HomeWrapper">
        <Container maxWidth="md" className="Home">
          <h2 className="HomeTitle">Who are you ??</h2>
          <ul className="HomeList">
            <li>
              <Link className="HomeLink" to="/new?userid=0001">ドラえもん</Link>
            </li>
            <li>
              <Link className="HomeLink" to="/new?userid=0002">のび太</Link>
            </li>
            <li>
              <Link className="HomeLink" to="/new?userid=0003">しずか</Link>
            </li>
            <li>
              <Link className="HomeLink" to="/new?userid=0004">ジャイアン</Link>
            </li>
            <li>
              <Link className="HomeLink"  to="/new?userid=0005">スネ夫</Link>
            </li>
          </ul>
        </Container>
      </div>
  );
};

export default Home;
