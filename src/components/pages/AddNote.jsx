import { useEffect, useState } from "react";
import { useNotes } from "../../context/notesContext";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const AddNote = () => {
  const { notesState, notesDispatch } = useNotes();
  const [errors, setErrors] = useState({});
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const optionsTranslated = notesState.categoryOptions.map(option => (
      {
        ...option,
        value: option.id,
        label:option.title
      }
    ));
    setCategoryOptions(optionsTranslated);
  }, [notesState.categoryOptions]);


  const [note, setNote] = useState({
    id: "",
    title: "",
    image: "",
    description: "",
    date: "",
    categories: "",
  });
  const handleMultiChange = (options) => {
    setNote({ ...note, categories: options });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error on change
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const categoriesToSave = note.categories.map(cat => cat.id);
    const noteToSave = {...note,
      categories: JSON.stringify(categoriesToSave)
    };
    notesDispatch({ type: "NOTE_ADDED", payload: noteToSave });

    navigate("/");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!note.title) newErrors.title = "Title is required";
    if (!note.description) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="card text-black w-full max-w-xl mx-auto shadow-xl p-4 m-4"
      >
        <h2 className="text-2xl text-center text-blue-600">Add New Note</h2>

        <div className="form-control">
          <label className="label">Title</label>
          <input
            type="text"
            className="input input-bordered"
            name="title"
            value={note.title}
            onChange={handleChange}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>

        <div className="form-control">
          <label className="label">Image</label>
          <input
            type="url"
            className="input input-bordered"
            name="image"
            value={note.image}
            onChange={handleChange}
          />
          {errors.image && <p className="text-red-500">{errors.image}</p>}
        </div>

        <div className="form-control">
          <label className="label">Description</label>
          <textarea
            className="textarea textarea-bordered"
            name="description"
            value={note.description}
            rows="4"
            onChange={handleChange}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>

        <div className="form-control">
          <label className="label">Date</label>
          <input
            className="input input-bordered"
            name="date"
            type="datetime-local"
            value={note.date}
            onChange={handleChange}
          />
          {errors.date && <p className="text-red-500">{errors.date}</p>}
        </div>

        <div className="form-control">
          <label className="label">Categories</label>
          <Select
            isMulti
            name="categories"
            options={categoryOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleMultiChange}
          />
        </div>
        <button className="btn btn-primary mt-4" type="submit">
          Add Note
        </button>
      </form>
    </>
  );
};

export default AddNote;
