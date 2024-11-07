import { useNavigate } from "react-router-dom";
import { useNotes } from "../../context/notesContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Logout = () => {
  const { notesDispatch } = useNotes();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("userdata");
    notesDispatch({ type: "USER_LOGGED_IN", payload: {} });
    toast.success("Good Bye!", {
        toastId: "bye"
      });
      navigate('/')
  }, []);

  return <></>;
};

export default Logout;
