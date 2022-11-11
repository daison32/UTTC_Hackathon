import logo from "./logo.svg";
import "./App.css";
import Form from "./Form";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useEffect, FC } from "react";
import React from "react";

type Hoge = {
  id: string;
  toWhom: string;
  message: string;
  point: number;
};

const App: FC = () => {
  const [posts, setPosts] = useState<Hoge[]>([]);

  const onSubmit = async (message: string, point: number, toWhom: string) => {
    console.log(toWhom, "onSubmit:", message, " ", point);
    await axios.post("https://hackathon-zyaveuwmya-uc.a.run.app/user", {
      toWhom: toWhom,
      message: message,
      point: point,
    });
    fetch("https://hackathon-zyaveuwmya-uc.a.run.app/user")
      .then((response) => response.json())
      .then((data) => {
        console.log("hoge", data);
        setPosts(data);
      });
  };

  useEffect(() => {
    fetch("https://hackathon-zyaveuwmya-uc.a.run.app/user?name=taro", {})
      .then((response) => response.json())
      .then((data) => {
        console.log("hoge", data);
        setPosts(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  // useEffect(() => {
  //   axios.get<json>("http://localhost:8000/users").then((response) => {
  //       const arr = response.data
  //     });
  // }, []);

  // const arr = ["りんご", "みかん", "ぶどう"];
  return (
    <div className="App">
      <header className="App-header">
        <div className="title">Express your gratitude </div>
        <Form onSubmit={onSubmit} />
        {/* <ul>
          {posts.map((user, i) => (
            <li className="list" key={i}>
              {user.name}, {user.age}
            </li>
          ))}
        </ul> */}
      </header>
    </div>
  );
};

export default App;

// 「何故submit.preventDefault()という処理を入れる必要があるのか」
// 　　　->submitに対するブラウザのデフォルトの反応が効いてしまい、submit毎に入力欄が空になってしまうため

// 「inputに対してvalueで値を指定するとどういうメリットがあるのか」
// 　 ->入力された値を取り出して、useStateに投げることができる
