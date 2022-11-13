import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./Point.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

type Hoge = {
  id: string;
  fromwhom: string;
  towhom: string;
  message: string;
  point: number;
};

type Point = {
    name: string;
    point: number;
}

const Point = () => {
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    fetch("https://hackathon-zyaveuwmya-uc.a.run.app/points", {})
      .then((response) => response.json())
      .then((data) => {
        // console.log("hoge", data);
        // console.log(data);
        setPoints(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  

  return (
    <div className="Point">
      <h3>Points</h3>
      <ul>
      {points.map((point, i) => (
            <li className="list" key={i}>
              {point.name} : {point.point}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Point;
