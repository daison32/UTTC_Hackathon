import logo from "./logo.svg";
import "./Newmessage.css";
import Form from "./Form";
import Home from "./Home";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useEffect, FC } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  RouteComponentProps
} from "react-router-dom";

const url = "https://hackathon-zyaveuwmya-uc.a.run.app";

// const location = useLocation();
type Hoge = {
  id: string;
  fromwhom: string;
  towhom: string;
  message: string;
  point: number;
};

const Newmessage: FC = () => {
  const [posts, setPosts] = useState<Hoge[]>([]);
  const location = useLocation(); 
  const userId = location.search.substr(8)
  console.log(location.search.substr(8))

  const onSubmit = async (towhom: string, message: string, point: number) => {
    console.log("onSubmit:", towhom, message, " ", point);
    await axios.post(url + "/transaction", {
      fromwhom: userId,
      towhom: towhom,
      message: message,
      point: point,
    });
    fetch(url + "/transactions")
      .then((response) => response.json())
      .then((data) => {
        console.log("hoge", data);
        setPosts(data);
      });
  };

  useEffect(() => {
    fetch(url + "/transactions", {})
      .then((response) => response.json())
      .then((data) => {
        console.log("hoge", data);
        setPosts(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const filteredData = posts.filter(d => {
    return d.fromwhom == userId || d.towhom == userId
  })
  console.log(filteredData)


  // const arr = ["りんご", "みかん", "ぶどう"];
  return (
    <div className="App">
      <nav className="HeaderLink">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <header className="App-header">
        <div className="title">Express your gratitude </div>
        <Form onSubmit={onSubmit} />
        <ul>
          {filteredData.map((transaction, i) => (
            
            <li className="list" key={i}>
              from{transaction.fromwhom} to {transaction.towhom} "
              {transaction.message}" [{transaction.point}]
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default Newmessage;
