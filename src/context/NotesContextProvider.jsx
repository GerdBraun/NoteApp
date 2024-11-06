import { useEffect, useReducer, useState } from "react";
import notesReducer from "./notesReducer";
import { NotesContext } from "./notesContext";

const categoryOptions = [
  { value: "1", label: "category 1" },
  { value: "2", label: "category 2" },
];

const NotesContextProvider = ({ children }) => {
  const [notesState, notesDispatch] = useReducer(notesReducer, {
    notes: [],
    filter: "all",
    categoryOptions: null,
    user: {},
  });
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notesState.notes));
  }, [notesState.notes]);

  const [error, setError] = useState(null);
  useEffect(() => {
    // fetch notes
    fetch("http://localhost:3001/api/notes", {
      headers: {
        accept: "application/json",
        // 'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.results && Array.isArray(data.results)) {
          notesDispatch({ type: "NOTES_LOADED", payload: data.results });
        } else {
          console.error("Unexpected data format:", data);
          setError("Unexpected data format");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      });

    // fetch categories
    fetch("http://localhost:3001/api/categs", {
      headers: {
        accept: "application/json",
        // 'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.results && Array.isArray(data.results)) {
          notesDispatch({ type: "CATEGORIES_LOADED", payload: data.results });
        } else {
          console.error("Unexpected data format:", data);
          setError("Unexpected data format");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      });
  }, []);

  return (
    <NotesContext.Provider value={{ notesState, notesDispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContextProvider;
