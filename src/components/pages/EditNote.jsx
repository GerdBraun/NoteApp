import { useEffect, useState } from "react";
import { useNotes } from "../../context/notesContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";

const EditNote = () => {
  const { notesState } = useNotes();
  const [errors, setErrors] = useState({});
  const [categoryOptions, setCategoryOptions] = useState([]);
  const { id } = useParams();

  const [note, setNote] = useState({
    id: "",
    urgency: "",
    title: "",
    image: "",
    description: "",
    date: "",
    loaded: false
  });

  useEffect(() => {
    if (!notesState.categoryOptions) return;
    const optionsTranslated = notesState.categoryOptions.map((option) => ({
      ...option,
      value: option.id,
      label: option.title,
    }));
    setCategoryOptions(optionsTranslated);
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_SERVER}/notes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const newData = {
            ...data,
            categories: [],
            categoriesRaw: JSON.parse(data.categories),
            loaded: true,
          };
          setNote(newData);
        } else {
          toast.error(`Note with id ${id} not found`);
        }
      })
      .catch((error) => {
        toast.error(`Error fetching note details: ${error}`);
      });
  }, [id]);

  useEffect(() => {
    if (!note.categoriesRaw || !notesState.categoryOptions) return;
    const selectedValues = notesState.categoryOptions
      .filter((val) => {
        return note.categoriesRaw.includes(val.id);
      })
      .map((cat) => {
        return {
          value: cat.id + "",
          label: cat.title,
        };
      });

    //setSelectedCategories(selectedValues);
    if (selectedValues && selectedValues.length >0) {
      setNote((prev) => ({ ...prev, 
        categories: selectedValues
      }))
    }
  }, [note.loaded]);

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
    if (!validateForm()) {
      toast.error("Please check form!");
      return;
    }

    const categoriesToSave = note.categories
      ? JSON.stringify(note.categories.map((cat) => cat.id))
      : "";
    const { title, urgency, image, description, date } = note;

    const urgencyNumber = urgency ? parseInt(urgency) : 0;

    fetch(`${import.meta.env.VITE_API_SERVER}/notes/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${notesState.userData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        urgency: urgencyNumber,
        image,
        description,
        date,
        categories: categoriesToSave,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(`API error: "${data.error}"`);
          return;
        }
        toast.success(`Note created "${note.title}"`);
        navigate("/");
      })
      .catch((error) => console.error("Error creating event:", error));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!note.title) newErrors.title = "Title is required";
    if (!note.description) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (!notesState.userData.token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="card text-black w-full max-w-xl mx-auto shadow-xl p-4 m-4"
      >
        <h2 className="text-2xl text-center text-blue-600">Edit Note</h2>

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
          <label className="label">Urgency</label>
          <select
            name="urgency"
            className="select select-bordered w-full"
            onChange={handleChange}
            value={note.urgency}
          >
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          {errors.image && <p className="text-red-500">{errors.image}</p>}
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
            value={note.categories}
            options={categoryOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleMultiChange}
          />
        </div>
        <button className="btn mt-4" type="submit">
          Save Note
        </button>
      </form>
    </>
  );
};

export default EditNote;
