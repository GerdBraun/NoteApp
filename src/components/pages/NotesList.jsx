import { useEffect } from "react";
import { useNotes } from "../../context/notesContext";
import NoteItem from "../partials/NoteItem";

const NotesList = () => {
  const {
    notesState: { notes, filter },
    loadData
  } = useNotes();

  const filteredNotes = notes.filter((note) => {
    if (filter === "all") return true;
    if (!note.categories) return false;
    return note.categories.find((cat) => {
        return cat === filter});
  });

  useEffect(()=>{
    loadData();
  },[])

  return (
    <ul className="p-4 mx-auto max-w-screen-xl grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredNotes && filteredNotes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ul>
  );
};

export default NotesList;
