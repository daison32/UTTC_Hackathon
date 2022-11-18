import "./Newmessage.css";
import Form from "./Form";
import Point from "./Point";
import List from "./List";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useEffect, FC } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useLocation,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import {
  Button,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from "@mui/material";

const url = "https://hackathon-zyaveuwmya-uc.a.run.app";

type Hoge = {
  id: string;
  fromwhom: string;
  towhom: string;
  message: string;
  point: number;
};

// ここからNewmessage本体
const Newmessage: FC = () => {
  const [posts, setPosts] = useState<Hoge[]>([]);
  const location = useLocation();
  const userId = location.search.substr(8);

  const onSubmit = async (towhom: string, message: string, point: number) => {
    if (towhom == userId) {
      return window.alert("自分に貢献は送れません！");
    }
    await axios.post(url + "/transactions", {
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

  const onUpdate = async (selectedId: string, message: string, point: number) => {
    await axios.post(url + "/edit", {
      id: selectedId,
      message: message,
      point: point,
    });
    fetch(url + "/transactions")
      .then((response) => response.json())
      .then((data) => {
        console.log("hoge", data);
        setPosts(data);
      });
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


  return (
    <Container maxWidth="sm" className="App">

      <nav className="HeaderLink">
        <Link to="/">Home</Link>
      </nav>

      <header className="App-header">
        <div className="User-Name">Hello {userIdToName(userId)}</div>

        <Point />
        <Form onSubmittt={onSubmit} />
        <List posts={posts} setPosts={setPosts} updateMessage={onUpdate} userId={userId} userIdToName={userIdToName}/>
      </header>

    </Container>
  );
};

export default Newmessage;
