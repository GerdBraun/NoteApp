import { useReducer } from "react"
import notesReducer from "./notesReducer"

const NotesContextProvider = ({children}) => {
    const [notesState, notesDispath] = useReducer(notesReducer, {
        notes: JSON.parse(localStorage.getItem('notes')) || [],
        filter: 'all',
    })
  return (
    <div>NotesContextProvider</div>
  )
}

export default NotesContextProvider