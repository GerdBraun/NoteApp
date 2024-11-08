import { useEffect, useState } from "react";
import { useNotes } from "../../context/notesContext";
import CategorySingle from "./CategorySingle";

const CategoryList = () => {
  const { notesState } = useNotes();

  const [categoryOptions, setCategoryOptions] = useState([]);
  useEffect(() => {
    setCategoryOptions(notesState.categoryOptions);
  }, [notesState.categoryOptions]);

  return (
    <ul className="p-4 mx-auto max-w-screen-xl grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categoryOptions &&
        categoryOptions.map((category) => (
          <CategorySingle key={category.id} category={category} />
        ))}
    </ul>
  );
};

export default CategoryList;
