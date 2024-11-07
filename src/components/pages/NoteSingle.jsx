import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNotes } from "../../context/notesContext";

const NoteSingle = () => {
  const { notesState } = useNotes();
  const [note, setNote] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_SERVER}/notes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const newData = { ...data, categories: JSON.parse(data.categories) };
          setNote(newData);
        } else {
          toast.error(`Note with id ${id} not found`);
        }
      })
      .catch((error) => {
        toast.error(`Error fetching note details: ${error}`);
      });
  }, [id]);

  const noteOptions = notesState.categoryOptions;
  const getCategoryName = (id) => {
    if (!noteOptions) return;
    return noteOptions.find((cat) => cat.id === id).title;
  };

  const handleDelete = () => {
    if (!notesState.userData.token) {
      toast.error("No token available for delete request");
      return;
    }
    if (window.confirm("Are you sure you want to delete this event?")) {
      fetch(`${import.meta.env.VITE_API_SERVER}/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${notesState.userData.token}`,
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              toast.error("Failed to delete note");
            });
          }
          toast.success("Note deleted successfully");
          navigate("/"); // Redirect to home after deletion
        })
        .catch((error) => {
          toast.error("Error deleting note:" + error.message);
        });
    }
  };

  if (!note)
    return (
      <div className="p-4 mx-auto max-w-screen-xl text-center">
        <h2 className="text-3xl text-red-600">Note not found</h2>
        <Link to="/" className="link-hover">
          back
        </Link>
      </div>
    );

  return (
    <div className="p-4 mx-auto max-w-screen-xl">
      <div className="card bg-base-100 w-full shadow-xl h-full">
        <figure className="w-full aspect-video">
          <img
            className="w-full"
            src={note.image || "https://placehold.co/800x450"}
            alt={note.title}
          />
        </figure>
        <div className="card-body">
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
                <Link
                  key={cat}
                  className="badge badge-outline"
                  to={`/?filter=${cat}`}
                >
                  {getCategoryName(cat)}
                </Link>
              ))}
          </div>
          <p>{note.description}</p>

          {notesState.userData.token &&
          note.ownerId === notesState.userData.user.id ? (
            <div className="card-actions justify-end">
              <Link
                className="btn btn-info text-white"
                to={`/notes/edit/${note.id}`}
              >
                edit
              </Link>
              <button
                className="btn btn-error text-white"
                onClick={handleDelete}
              >
                delete
              </button>
            </div>
          ) : (
            <p className="text-sm">
              You can NOT edit or delete this note because it is owned by an
              user (id: {note.ownerId}).
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteSingle;
