import Home from "./Home";
import Point from "./Point";
import Newmessage from "./Newmessage";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useEffect, FC } from "react";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const url = "https://hackathon-zyaveuwmya-uc.a.run.app";

type Hoge = {
  id: string;
  fromwhom: string;
  towhom: string;
  message: string;
  point: number;
};

const App: FC = () => {
  const [posts, setPosts] = useState<Hoge[]>([]);

  const onSubmit = async (towhom: string, message: string, point: number) => {
    console.log("onSubmit:", towhom, message, " ", point);
    await axios.post("https://hackathon-zyaveuwmya-uc.a.run.app/transaction", {
      fromwhom: "9999",
      towhom: towhom,
      message: message,
      point: point,
    });
    fetch("https://hackathon-zyaveuwmya-uc.a.run.app/transactions")
      .then((response) => response.json())
      .then((data) => {
        console.log("hoge", data);
        setPosts(data);
      });
  };

  useEffect(() => {
    fetch("https://hackathon-zyaveuwmya-uc.a.run.app/transactions", {})
      .then((response) => response.json())
      .then((data) => {
        console.log("hoge", data);
        setPosts(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  // const arr = ["りんご", "みかん", "ぶどう"];
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/new">
            <Newmessage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

// 「何故submit.preventDefault()という処理を入れる必要があるのか」
// 　　　->submitに対するブラウザのデフォルトの反応が効いてしまい、submit毎に入力欄が空になってしまうため

// 「inputに対してvalueで値を指定するとどういうメリットがあるのか」
// 　 ->入力された値を取り出して、useStateに投げることができる
