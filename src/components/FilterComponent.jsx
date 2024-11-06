import { useEffect, useState } from "react";
import { useNotes } from "../context/notesContext";

const FilterComponent = () => {
  const { notesState, notesDispatch } = useNotes();
  const { filter } = notesState;
  const setFilterInView = (filter) => {
    notesDispatch({ type: "FILTER_SET", payload: filter });
  };

  const [categoryOptions, setCategoryOptions] = useState([]);
  useEffect(() => {
    setCategoryOptions(notesState.categoryOptions);
    console.log('FilterCommponent',notesState.categoryOptions)
  }, [notesState.categoryOptions]);

  return (
    <div className="mb-4 p-4 flex space-x-2 shadow-lg">
         <button
          key={0}
          onClick={() => setFilterInView('all')}
          className={`btn ${filter === 'all' ? "btn-active" : ""}`}
        >
          All
        </button>
     {categoryOptions && categoryOptions.map((category) => (
        <button
          key={category.id}
          onClick={() => setFilterInView(category.id)}
          className={`btn ${filter === category.value ? "btn-active" : ""}`}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
};

export default FilterComponent;
