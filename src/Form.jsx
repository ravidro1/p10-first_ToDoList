import { Button, TextField } from "@mui/material";
import "./form.css";
import { useState } from "react";

function Form({ setToDo, addTab, alertWindow }) {
  // function Form() {

  const [newMission, setnewMission] = useState({
    task: "",
    completed: false,
    // label:
  });

  const [newTab, setNewTab] = useState("");

  function stopRef(event) {
    event.preventDefault();
  }

  function missionClick() {
    if (newMission.task.length > 0 && !(newMission.task.trim() === "")) {
      setToDo(newMission);
      setnewMission({ ...newMission, task: "" });
    } else{
      alertWindow(1);
      setnewMission({ ...newMission, task: "" });
    }
  }

  function missionUpdate(e) {
    setnewMission({ ...newMission, task: e.target.value });
  }

  function tabClick() {
    if (newTab.length > 0 && !(newTab.trim() === "")) {
      addTab(newTab);
      setNewTab("");
    } else{
      alertWindow(0);
      setNewTab("");
    }
  }

  function tabUpdate(e) {
    setNewTab(e.target.value);
  }



  return (
    <div className="allFormDiv">
      <form className="TabForm, Form" onSubmit={stopRef}>
        <TextField
          className="textBox"
          label="New Tab"
          value={newTab}
          type="text"
          onChange={tabUpdate}
        />
        <Button type="submit" onClick={tabClick}>
          {" "}
          NEW TAB{" "}
        </Button>
      </form>

      <form className="missionForm, Form" onSubmit={stopRef}>
        <TextField
          className="textBox"
          label="Task"
          value={newMission.task}
          type="text"
          onChange={missionUpdate}
        />
        <Button type="submit" onClick={missionClick}>
          {" "}
          ADD{" "}
        </Button>
      </form>
    </div>
  );
}

export default Form;
