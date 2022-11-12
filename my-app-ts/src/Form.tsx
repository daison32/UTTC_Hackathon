import { useState } from "react";
import { useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import user from "./user.json"; //レスポンスのJSON(詳しくは補足で)
import React from "react";

const url = "http://localhost:8000";

type USER = typeof user; //画面に表示するユーザー情報の型
type hoge = {
  id: string;
  towhom: string;
  message: string;
  point: number;
};

type Props = {
  onSubmit: (towhom: string, message: string, point: number) => Promise<void>;
  // setPosts: (data: React.SetStateAction<hoge[]>) => void;
};

const Form = (props: Props) => {
  const [message, setMessage] = useState("");
  const [point, setPoint] = useState<number | undefined>(undefined);
  const [towhom, setToWhom] = useState("")
  const [seleceItem, setSelectItem] = useState("アイテム1");

  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (typeof point === "undefined") {
      return 
    }
    await props.onSubmit(towhom, message, point);
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
          value={point}
          onChange={(e) => setPoint(Number(e.target.value))}
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
