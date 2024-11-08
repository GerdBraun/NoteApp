import { useEffect, useReducer } from "react";
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
    loadData();
    const userData = JSON.parse(localStorage.getItem("userdata")) || {};
    notesDispatch({ type: "USER_LOGGED_IN", payload: userData });
  }, []);

  const loadData = () => {
    loadNotes();
    loadCategories();
  };

  const loadNotes = () => {
    // fetch notes
    fetch(`${import.meta.env.VITE_API_SERVER}/notes`, {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.results && Array.isArray(data.results)) {
          const list = data.results.map((note) => {
            const cats = note.categories ? JSON.parse(note.categories) : null;
            return {
              ...note,
              categories: cats,
            };
          });

          notesDispatch({ type: "NOTES_LOADED", payload: list });
        } else {
          toast.error("Unexpected data format:", data);
        }
      })
      .catch((error) => {
        toast.error("Error fetching data:", error);
      });
  };

  const loadCategories = () => {
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
          toast.error(`Unexpected data format: ${data}`);
        }
      })
      .catch((error) => {
        toast.error(`Error fetching data: ${error}`);
      });
  };

  return (
    <NotesContext.Provider value={{ notesState, notesDispatch, loadData, loadNotes, loadCategories }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContextProvider;
