import { Link } from "react-router-dom";
import { useNotes } from "../../context/notesContext";

const NoteItem = ({ note }) => {
  const { notesDispatch } = useNotes();

  const toggleNote = (id) => {
    notesDispatch({ type: "NOTE_TOGGLED", payload: id });
  };

  return (
    <li className="flex items-center mb-2">
      <div className="card bg-base-100 w-full shadow-xl">
        <figure>
          <img
            src={note.image || "https://placehold.co/600x400"}
            alt={note.title}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {note.title}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          {note.date && (
            <p className="text-sm">
              Date: {new Date(note.date).toLocaleDateString()}
            </p>
          )}
          <p>{note.description}</p>
          <div className="card-actions">
            <input
              type="checkbox"
              checked={note.completed}
              onChange={() => toggleNote(note.id)}
              className="mr-2"
            />
            {note.categories.map((cat) => (
              <div key={cat.value} className="badge badge-outline">
                {cat.label}
              </div>
            ))}
          </div>
          <div className="card-actions justify-end">
            <Link className="btn btn-primary" to={`/notes/${note.id}`}>
              view
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default NoteItem;
