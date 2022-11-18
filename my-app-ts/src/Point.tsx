import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./Point.css";


type Score = {
  name: string;
  point: number;
};

type Props = {
  points: Score[]
};

const Point = (props: Props) => {

  return (
    <div className="Point">
      <h3>Points</h3>
      <ul>
        {props.points.map((point, i) => (
          <li className="list" key={i}>
            {point.name} : {point.point}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Point;
