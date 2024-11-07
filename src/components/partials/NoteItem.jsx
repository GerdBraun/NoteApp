import { Link } from "react-router-dom";
import { useNotes } from "../../context/notesContext";

const NoteItem = ({ note }) => {
  const { notesState } = useNotes();

  const noteOptions = notesState.categoryOptions;

  const getCategoryName = (id) => {
    if (!noteOptions) return;
    return noteOptions.find((cat) => cat.id === id).title;
  };

  return (
    <li className="flex items-center mb-2">
      <div className="card bg-base-100 w-full shadow-xl h-full">
        <figure className="h-52">
          <img
            src={note.image || "https://placehold.co/600x400"}
            alt={note.title}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {note.title}
            {note.urgency > 0 && (
              <div className="badge badge-secondary">
                Urgency: {note.urgency}
              </div>
            )}
          </h2>
          {note.date && (
            <p className="text-sm">
              {new Date(note.date).toLocaleDateString()}
            </p>
          )}
          <p>{note.description}</p>
          <div className="card-actions">
            {note.categories &&
              note.categories.map((cat) => (
                <div key={cat} className="badge badge-outline">
                  {getCategoryName(cat)}
                </div>
              ))}
          </div>
          <div className="card-actions justify-end">
            <Link className="btn" to={`/notes/${note.id}`}>
              view
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default NoteItem;
