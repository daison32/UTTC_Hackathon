import { useState } from "react";
import "./Form.css";

import { useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import React from "react";

type Props = {
  onSubmittt: (towhom: string, message: string, point: number) => Promise<void>;
};

const Form = (props: Props) => {
  const [message, setMessage] = useState("");
  const [point, setPoint] = useState<number | undefined>(undefined);
  const [towhom, setToWhom] = useState("0001");
  const [seleceItem, setSelectItem] = useState("アイテム1");

  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (typeof point === "undefined") {
      return;
    }
    await props.onSubmittt(towhom, message, point);
  };

  // メニューデータ
  const items = ["ドラえもん", "のび太", "しずか", "ジャイアン", "スネ夫"];

  // to whomがチェンジされた時
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectItem(e.target.value);
    console.log(e.target.value);
    switch (e.target.value) {
      case "ドラえもん":
        setToWhom("0001");
        return;
      case "のび太":
        setToWhom("0002");
        return;
      case "しずか":
        setToWhom("0003");
        return;
      case "ジャイアン":
        setToWhom("0004");
        return;
      case "スネ夫":
        setToWhom("0005");
        return;
    }
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
        <label className="label">Point(~100): </label>
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
