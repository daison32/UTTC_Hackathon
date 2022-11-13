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
import { useModal } from "react-hooks-use-modal";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { FaGithub } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import Modal from "react-modal";
import { Box } from "@mui/material";
import { Message } from "@mui/icons-material";

const customStyles = {
  content: {
    top: "20%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "40%",
  },
};

const CategoryList = ["ドラえもん", "中華", "洋食"];

const MenuList = [
  { category: "和食", menu: "うどん" },
  { category: "和食", menu: "蕎麦" },
];

// const chipColor = (category: string) => {
//   if (category === "和食") {
//     return "success";
//   } else if (category === "洋食") {
//     return "warning";
//   } else {
//     return "secondary";
//   }
// };

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
  const [lunchList, setLunchList] = useState([
    { id: "ABCDEFGH", fromwhom: "from1", towhom: "to1", message: "あいうえお" },
    { id: "KJHKUGK", fromwhom: "from2", towhom: "to2", message: "かきくけこ" },
    { id: "ABCDEFGH", fromwhom: "from3", towhom: "to3", message: "さしすせそ" },
  ]);

  const [selectedId, setSelectedId] = useState("");
  const [selectedFromwhom, setSelectedFromwhom] = useState("");
  const [selectedTowhom, setSelectedTowhom] = useState("");
  const [selectedMessage, setSelectedMessage] = useState("");
  const [selectedPoint, setSelectedPoint] = useState(0);

  const openEditModal = (
    id: string,
    fromwhom: string,
    towhom: string,
    message: string,
    point: number
  ) => {
    setSelectedId(id);
    setSelectedFromwhom(fromwhom);
    setSelectedTowhom(towhom);
    setSelectedMessage(message);
    setSelectedPoint(point);
    setEditModalIsOpen(true);
  };

  // モーダルの更新押した時の反応
  async function updateLunchList(id: string, message: string, point: number) {
    console.log([selectedId, message, point]);
    await axios.post(url + "/edit", {
      id: selectedId,
      message: message,
      point: point,
    });

    closeModal();
  }

  const closeModal = () => {
    setEditModalIsOpen(false);
  };
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [point, setPoint] = useState<number | undefined>(undefined);
  const [posts, setPosts] = useState<Hoge[]>([]);
  const location = useLocation();
  const userId = location.search.substr(8);
  console.log(location.search.substr(8));

  const onSubmit = async (towhom: string, message: string, point: number) => {
    console.log("onSubmit:", towhom, message, " ", point);
    if (towhom == userId) {
      return window.alert("自分に貢献は送れません！");
    }
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
      data: { id: id },
    });
    fetch(url + "/transactions")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  };

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
    <Container maxWidth="sm" className="App">
      <nav className="HeaderLink">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <header className="App-header">
         <div className="User-Name">Hello {userIdToName(userId)}</div>
         <Point />
         {/* <div className="title">Express your gratitude </div> */}
         <Form onSubmit={onSubmit} />
               <TableContainer component={Paper} sx={{ maxHeight: 880 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Points</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {userIdToName(row.fromwhom)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {userIdToName(row.towhom)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.message}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.point}
                </TableCell>
                <TableCell component="th" scope="row">
                  {" "}
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      openEditModal(
                        row.id,
                        row.fromwhom,
                        row.towhom,
                        row.message,
                        row.point
                      );
                    }}
                  >
                    <AiFillEdit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ここからモーダルの内容       */}
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="row">
          <label className="label">Message: </label>
          <input
            className="inputBox"
            type={"text"}
            id="message"
            name="message"
            value={selectedMessage}
            onChange={(e) => setSelectedMessage(e.target.value)}
          ></input>
        </div>
        <div className="row">
          <label className="label">Point: </label>
          <input
            className="inputBox"
            type={"number"}
            id="age"
            name="age"
            value={selectedPoint}
            onChange={(e) => setSelectedPoint(Number(e.target.value))}
          ></input>
        </div>
        <Box mb={2}>
          <FormControl sx={{ mr: 2, mt: 2 }}>
            <button
              className="button"
              onClick={() =>
                updateLunchList(selectedId, selectedMessage, selectedPoint)
              }
            >
              更新
            </button>
          </FormControl>
        </Box>
      </Modal>
      </header>

    </Container>

    // <div className="App">
    //   <nav className="HeaderLink">
    //     <ul>
    //       <li>
    //         <Link to="/">Home</Link>
    //       </li>
    //     </ul>
    //   </nav>
    //   <header className="App-header">
    //     <div className="User-Name">Hello {userIdToName(userId)}</div>
    //     <Point />
    //     {/* <div className="title">Express your gratitude </div> */}
    //     <Form onSubmit={onSubmit} />
    //     <ul>
    //       {filteredData.map((transaction, i) => (
    //         <li className="list" key={i}>
    //           {/* from
    //           <input
    //             type="text"
    //             value={userIdToName(transaction.fromwhom)}
    //             onChange={(e) => e.preventDefault()}
    //           ></input>
    //           to
    //           <input
    //             type="text"
    //             value={" " + userIdToName(transaction.towhom)}
    //             onChange={(e) => e.preventDefault()}
    //           ></input>
    //           "
    //           <input
    //             type="text"
    //             value={transaction.message}
    //             onChange={(e) => e.preventDefault()}
    //           ></input>
    //           " */}
    //           from{userIdToName(transaction.fromwhom)} to
    //           {" " + userIdToName(transaction.towhom)} "{transaction.message}" [
    //           {transaction.point}]
    //           <button onClick={() => handleOnRemove(transaction.id)}>
    //             削除
    //           </button>
    //           <Button
    //             variant="contained"
    //             color="primary"
    //             onClick={() => {
    //               setEditModalIsOpen(true);
    //             }}
    //           >
    //             編集
    //           </Button>
    //           <Modal isOpen={editModalIsOpen} style={customStyles}>
    //             モーダル開いた
    //           </Modal>
    //         </li>
    //       ))}
    //     </ul>
    //   </header>
    // </div>
  );
};

export default Newmessage;
