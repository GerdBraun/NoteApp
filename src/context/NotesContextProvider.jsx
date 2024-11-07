import { useEffect, useReducer, useState } from "react";
import notesReducer from "./notesReducer";
import { NotesContext } from "./notesContext";
import { toast } from "react-toastify";

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
    loadData();
    const userData = JSON.parse(localStorage.getItem('userdata')) || {};
    notesDispatch({ type: "USER_LOGGED_IN", payload: userData });
  }, []);

  const loadData = () => {
    // fetch notes
    fetch(`${import.meta.env.VITE_API_SERVER}/notes`, {
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

          notesDispatch({ type: "NOTES_LOADED", payload: list });
        } else {
          toast.error("Unexpected data format:", data);
        }
      })
      .catch((error) => {
        toast.error("Error fetching data:", error);
      });

    // fetch categories
    fetch(`${import.meta.env.VITE_API_SERVER}/categs`, {
      headers: {
        accept: "application/json",
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
