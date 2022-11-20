import React from "react";
import "./List.css";
import { useState } from "react";
import { useEffect, FC } from "react";
import axios, { AxiosResponse } from "axios";
import Modal from "react-modal";

import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";

type Props = {
  posts: Hoge[];
  setPosts: React.Dispatch<React.SetStateAction<Hoge[]>>
  userId: string;
  userIdToName: (userId: string) => "ドラえもん" | "のび太" | "しずか" | "ジャイアン" | "スネ夫" | "出来杉" | undefined;
  updateMessage: (selectedId: string, message: string, point: number) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

type Hoge = {
  id: string;
  fromwhom: string;
  towhom: string;
  message: string;
  point: number;
};

const url = "https://hackathon-zyaveuwmya-uc.a.run.app";

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




const List = (props: Props) => {
  const [selectedId, setSelectedId] = useState("");
  const [selectedFromwhom, setSelectedFromwhom] = useState("");
  const [selectedTowhom, setSelectedTowhom] = useState("");
  const [selectedMessage, setSelectedMessage] = useState("");
  const [selectedPoint, setSelectedPoint] = useState(0);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  
  useEffect(() => {
    fetch(url + "/transactions", {})
      .then((response) => response.json())
      .then((data) => {
        console.log("hoge", data);
        props.setPosts(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const handleOnRemove = async (id: string) => {
    props.onDelete(id)
  };

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

  const filteredData = props.posts.filter((d) => {
    return d.fromwhom == props.userId || d.towhom == props.userId;
  });
  console.log(filteredData);

  const closeModal = () => {
    setEditModalIsOpen(false);
  };

  async function updateMessage(message: string, point: number) {
    props.updateMessage(selectedId, message, point)

    closeModal();
  }

  return (
    <Container maxWidth="md" className="App">
      <TableContainer className="Table" component={Paper} sx={{ maxHeight: 880 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>EDIT or DELETE</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {props.userIdToName(row.fromwhom)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {props.userIdToName(row.towhom)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.message}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.point}
                </TableCell>
                <TableCell component="th" scope="row">
                  {" "} 

                  {(() => {
                    if (row.fromwhom ==props.userId) {
                      return <div>
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
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      handleOnRemove(row.id);
                    }}
                  >
                    <AiFillDelete />
                  </IconButton>
                      </div>
                    }
                  })()}

                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
                updateMessage(selectedMessage, selectedPoint)
              }
            >
              更新
            </button>
          </FormControl>
        </Box>
      </Modal>
    </Container>
  );
};

export default List;
