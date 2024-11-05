import { useEffect, useReducer } from "react";
import notesReducer from "./notesReducer";
import { NotesContext } from "./notesContext";

const NotesContextProvider = ({ children }) => {
  const [notesState, notesDispatch] = useReducer(notesReducer, {
    notes: JSON.parse(localStorage.getItem("notes")) || [],
    filter: "all",
  });
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notesState.notes));
  }, [notesState.notes]);

  return (
    <NotesContext.Provider value={{ notesState, notesDispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContextProvider;