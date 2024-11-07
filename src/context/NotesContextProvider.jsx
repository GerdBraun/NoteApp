import { useEffect, useReducer, useState } from "react";
import notesReducer from "./notesReducer";
import { NotesContext } from "./notesContext";

const NotesContextProvider = ({ children }) => {
  const [notesState, notesDispatch] = useReducer(notesReducer, {
    notes: [],
    filter: "all",
    categoryOptions: null,
    userData: {},
  });
  useEffect(() => {
    //localStorage.setItem("notes", JSON.stringify(notesState.notes));
  }, [notesState.notes]);

  const [error, setError] = useState(null);
  useEffect(() => {
    //loadData();
  }, []);

  const loadData = () => {
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
          const list = data.results.map((note) => {
            const cats =  (note.categories) ? JSON.parse(note.categories) : null;
            return {
            ...note,
            categories: cats,
          }});

          console.log(list)

          //notesDispatch({ type: "NOTES_LOADED", payload: data.results });
          notesDispatch({ type: "NOTES_LOADED", payload: list });
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
  };

  return (
    <NotesContext.Provider value={{ notesState, notesDispatch, loadData }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContextProvider;
