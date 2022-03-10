import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { Modal } from "@material-ui/core";
import TextareaAutosize from "react-autosize-textarea";

function Note({ id, title, content, getNotes, date }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteNote = async (e, p) => {
    e.preventDefault();
    try {
      let response = await axios.delete(
        `https://jotting-keeper.herokuapp.com/keeper/notes/${id}`
      );
      console.log("deleted", response.data);
      getNotes();
    } catch (err) {
      throw err.message;
    }
  };
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const update = async () => {
    try {
      let response = await axios.patch(`/keeper/notes/${id}`, {
        title: newTitle,
        content: newContent,
      });
      console.log("Successfully updated.", response);
      getNotes();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="note">
        <div className="note__main" onClick={handleOpen}>
          <span className="noteTitle" name="title">
            {" "}
            {newTitle}{" "}
          </span>
          <p className="noteContent scroll" name="content">
            {newContent}
          </p>
        </div>
        <div className="note__footer">
          <IconButton onClick={deleteNote}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <Modal
        className="modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <form className="paper">
          <input
            type="text"
            id="simple-modal-title"
            value={newTitle}
            placeholder="Title"
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={update}
            name="title"
          />
          <TextareaAutosize
            className="scroll"
            id="simple-modal-description"
            autoFocus="true"
            rows={6}
            maxRows={13}
            value={newContent}
            placeholder="Take a note..."
            onChange={(e) => setNewContent(e.target.value)}
            onBlur={update}
          />
        </form>
      </Modal>
    </>
  );
}

export default Note;
