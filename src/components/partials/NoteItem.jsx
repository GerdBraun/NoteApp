import { Link, useSearchParams } from "react-router-dom";
import { useNotes } from "../../context/notesContext";

const NoteItem = ({ note }) => {
  const { notesState, notesDispatch } = useNotes();

  const noteOptions = notesState.categoryOptions;

  console.log(note)

  const getCategoryName = (id) => {
    if (!noteOptions) return;
    return noteOptions.find((cat) => cat.id === id).title;
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const setFilterInView = (filter) => {
    notesDispatch({ type: "FILTER_SET", payload: filter });
    setSearchParams({ filter: filter });
  };

  return (
    <li className="flex items-center mb-2">
      <div className="card bg-base-100 w-full shadow-xl h-full">
        <figure className="w-full aspect-video">
          <img
            className="w-full"
            src={note.image || "https://placehold.co/800x450"}
            alt={note.title}
          />
        </figure>
        <div className="card-body flex flex-col justify-between">
          <div>
            <h2 className="card-title mb-4">
              {note.title}
              {note.urgency > 0 && (
                <div className="badge badge-secondary">
                  Urgency: {note.urgency}
                </div>
              )}
            </h2>
            {note.date && (
              <p className="text-sm mb-4">
                {new Date(note.date).toLocaleDateString()}
              </p>
            )}
            <div className="card-actions">
              {note.categories &&
                note.categories.map((cat) => (
                  <button
                    key={cat}
                    className="badge badge-outline"
                    onClick={() => setFilterInView(cat)}
                  >
                    {getCategoryName(cat)}
                  </button>
                ))}
            </div>
          </div>{" "}
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
