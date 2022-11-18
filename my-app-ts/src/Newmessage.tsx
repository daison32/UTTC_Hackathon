import "./Newmessage.css";
import Form from "./Form";
import Point from "./Point";
import List from "./List";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useEffect, FC } from "react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Container } from "@mui/material";

const url = "https://hackathon-zyaveuwmya-uc.a.run.app";

type Hoge = {
  id: string;
  fromwhom: string;
  towhom: string;
  message: string;
  point: number;
};

type Score = {
  name: string;
  point: number;
};

// ここからNewmessage本体
const Newmessage: FC = () => {
  const [posts, setPosts] = useState<Hoge[]>([]);
  const [points, setPoints] = useState<Score[]>([]);

  // ユーザーをパラメータで判定
  const location = useLocation();
  const userId = location.search.substr(8);

  // 再レンダリングの関数
  const reRendering = () => {
    fetch(url + "/transactions")
      .then((response) => response.json())
      .then((data) => {
        console.log("hoge", data);
        setPosts(data);
      });
    fetch(url + "/points")
      .then((response) => response.json())
      .then((data) => {
        setPoints(data);
        console.log("active");
      });
  };

  // 一覧を取得(READ)
  useEffect(() => {
    reRendering();
  }, []);

  // 追加(CREATE)
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
    reRendering();
  };

  // 編集（UPDATE）
  const onUpdate = async (selectedId: string, message: string, point: number) => {
    await axios.put(url + "/transactions", {
      id: selectedId,
      message: message,
      point: point,
    });
    reRendering();
  };

  // 削除(DELETE)
  const onDelete = async (id: string) => {
    await axios.delete(url + "/transactions", {
      data: { id: id },
    });
    reRendering();
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

  return (
    <Container maxWidth="sm" className="App">
      <nav className="HeaderLink">
        <Link to="/">Home</Link>
      </nav>

      <header className="App-header">
        <div className="User-Name">Hello {userIdToName(userId)}</div>

        <Point points={points} />
        <Form onSubmittt={onSubmit} />
        <List
          posts={posts}
          setPosts={setPosts}
          updateMessage={onUpdate}
          onDelete={onDelete}
          userId={userId}
          userIdToName={userIdToName}
        />
      </header>
    </Container>
  );
};

export default Newmessage;
