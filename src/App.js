import React, { useState, useEffect, useRef } from "react";
import "./styles/app.css";
import { FormControl, Input } from "@material-ui/core";
import Message from "./components/Message";
import db from "./utils/firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
  const ref = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, []);

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs
            .map((doc) => ({
              id: doc.id,
              message: doc.data(),
              timestamp: doc.timestamp,
            }))
            .sort((a, b) => {
              return a.timestamp - b.timestamp;
            })
        );
      });
  }, []);

  useEffect(() => {
    if (messages.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages.length]);

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <div className="header">
        <img
          alt="app logo"
          className="app__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/800px-Facebook_Messenger_logo_2020.svg.png"
        />
        <h1>Hello everybody, how is it going?</h1>
        <h2>Welcome {username}</h2>
      </div>
      <div className="messages__container">
        <div ref={ref} style={{ height: "fit-content" }}>
          <FlipMove>
            {messages.map(({ id, message }) => (
              <Message key={id} username={username} message={message} />
            ))}
          </FlipMove>
        </div>
      </div>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Enter a message"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <IconButton
            className="app__iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
    </div>
  );
}

export default App;
