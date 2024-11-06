import { useEffect, useReducer } from "react";
import notesReducer from "./notesReducer";

const DataFetchingUseReducer = () => {
  const [state, dispatch] = useReducer(notesReducer, []);

  useEffect(() => {
    fetch("http://localhost:3001/api/notes", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.results && Array.isArray(data.results)) {
          //   setEvents(data.results);
          dispatch({
            type: "NOTES_FETCHED",
            payload: data.results,
          });
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return <div>DataFetchingUseReducer</div>;
};
export default DataFetchingUseReducer;
