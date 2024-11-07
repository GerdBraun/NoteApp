import { Navigate } from "react-router-dom";
import { useNotes } from "../../context/notesContext";
import { toast } from "react-toastify";
import { useState } from "react";

const Logout = () => {
  const { notesDispatch } = useNotes();

  useState(() => {
    localStorage.removeItem("userdata");
    notesDispatch({ type: "USER_LOGGED_IN", payload: {} });
    toast.success("Good Bye!", {
        toastId: "bye"
      });
  }, []);

  return <Navigate to="/" />;
};

export default Logout;
