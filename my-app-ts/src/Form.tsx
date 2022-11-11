import { useState } from "react";
import { useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import user from "./user.json"; //レスポンスのJSON(詳しくは補足で)
import React from "react";

const url = "http://localhost:8000";

type USER = typeof user; //画面に表示するユーザー情報の型
type hoge = {
  id: string;
  toWhom: string;
  message: string;
  point: number;
};

type Props = {
  onSubmit: (message: string, point: number, toWhom: string) => Promise<void>;
  // setPosts: (data: React.SetStateAction<hoge[]>) => void;
};

const Form = (props: Props) => {
  const [message, setMessage] = useState("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const [toWhom, setToWhom] = useState("")
  const [seleceItem, setSelectItem] = useState("アイテム1");

  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (typeof age === "undefined") {
      return 
    }
    await props.onSubmit(message, age, toWhom);
  };

  // メニューデータ
  const items = ["ドラえもん", "のび太", "しずか", "ジャイアン", "スネ夫"];

  // to whomがチェンジされた時
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectItem(e.target.value)
    console.log(e.target.value)
    setToWhom(e.target.value)
  };

  return (
    <form className="form">
      <div className="row">
        <div className="container">
          <section>
          <label className="label">To: </label>
            <select value={seleceItem} onChange={handleChange}>
              {items.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </section>
        </div>
      </div>
      <div className="row">
        <label className="label">Message: </label>
        <input
          className="inputBox"
          type={"text"}
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></input>
      </div>
      <div className="row">
        <label className="label">Point: </label>
        <input
          className="inputBox"
          type={"number"}
          id="age"
          name="age"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        ></input>
      </div>
      <button className="button" onClick={submit}>
        Send
      </button>
      <div></div>
    </form>
  );
};

export default Form;
