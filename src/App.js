import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Input } from "@material-ui/core";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { username: "Qazi", message: "hey guys" },
    { username: "Mike", message: "hey guys" },
  ]);
  const [username, setUsername] = useState("");

  // Every time that you neeed to change a variable you have to use setInput(<stuff>) or similar
  //useState = wariable in React, it's a space in memory that will be erased when refresh.
  // useEffect = run code on a condition in React

  useEffect(
    () => {
      //Run code here...
      //if its blank inside [] (dependencies), this code runs once when the app component loads
      //if we have a cvariable like input, it will run the code every time that variable changes
      setUsername(prompt("Please enter your name"));
    },
    //this is the condition
    []
  );

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // setMessages([...messages, { username: username, message: input }]);
    setInput("");
  };

  return (
    <div className="App">
      <img
        className="app__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/800px-Facebook_Messenger_logo_2020.svg.png"
      />
      <h1>Hello everybody, how is it going?</h1>
      <h2>Welcome {username}</h2>
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
          className="app__input"
            placeholder="Enter a message"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <IconButton className="app__iconButton"
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
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
