import { useEffect, useState } from "react";
import { useNotes } from "../../context/notesContext";
import { useSearchParams } from "react-router-dom";

const FilterComponent = () => {
  const { notesState, notesDispatch } = useNotes();
  const { filter } = notesState;

  const [searchParams, setSearchParams] = useSearchParams();

  const setFilterInView = (filter) => {
    notesDispatch({ type: "FILTER_SET", payload: filter });
    setSearchParams({filter:filter})
  };

  const [categoryOptions, setCategoryOptions] = useState([]);
  useEffect(() => {
    setCategoryOptions(notesState.categoryOptions);

    const searchFilter = searchParams.get('filter')
    const paramFilter = (!searchFilter || searchFilter==='all') ? 'all': parseInt(searchFilter);

    setFilterInView(paramFilter);



  }, [notesState.categoryOptions]);

  return (
    <div className="mb-4 p-4 flex space-x-2 shadow-lg">
      <button
        key={0}
        onClick={() => setFilterInView("all")}
        className={`btn btn-sm ${filter === "all" ? "btn-active" : ""}`}
      >
        All
      </button>
      {categoryOptions &&
        categoryOptions.map((category) => (
          <button
            key={category.id}
            onClick={() => setFilterInView(category.id)}
            className={`btn btn-sm ${filter === category.id ? "btn-active" : ""}`}
          >
            {category.title}
          </button>
        ))}
    </div>
  );
};

export default FilterComponent;
