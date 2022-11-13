import logo from "./logo.svg";
import "./Newmessage.css";
import Form from "./Form";
import Point from "./Point";
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
  RouteComponentProps,
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
  const userId = location.search.substr(8);
  console.log(location.search.substr(8));

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

  const handleOnRemove = async (id: string) => {
    await axios.delete(url + "/transactions", {
      data: {id: id}
    })
  }

  // userId を 名前(string)に
  const userIdToName = (userId: string) => {
    switch (userId) {
      case "0001":
        return "ドラえもん";
      case "0002":
        return "のび太";
      case "0003":
        return "しずか";
      case "0004":
        return "ジャイアン";
      case "0005":
        return "スネ夫";
      case "9999":
        return "出来杉";
    }
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

  const filteredData = posts.filter((d) => {
    return d.fromwhom == userId || d.towhom == userId;
  });
  console.log(filteredData);

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
        <Point />
        {/* <div className="title">Express your gratitude </div> */}
        <Form onSubmit={onSubmit} />
        <ul>
          {filteredData.map((transaction, i) => (
            <li className="list" key={i}>
              from{userIdToName(transaction.fromwhom)} to{" "}
              {userIdToName(transaction.towhom)} "{transaction.message}" [
              {transaction.point}]
              <button onClick={() => handleOnRemove(transaction.id)}>削除</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default Newmessage;
