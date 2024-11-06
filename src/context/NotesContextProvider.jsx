import { useEffect, useReducer } from "react";
import notesReducer from "./notesReducer";
import { NotesContext } from "./notesContext";

const categoryOptions = [
  { value: "category1", label: "category 1" },
  { value: "category2", label: "category 2" },
  { value: "category3", label: "category 3" },
];

const NotesContextProvider = ({ children }) => {
  const [notesState, notesDispatch] = useReducer(notesReducer, {
    notes: JSON.parse(localStorage.getItem("notes")) || [],
    filter: "all",
    categoryOptions:categoryOptions,
    user:{},
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
