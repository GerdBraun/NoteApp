import { useNotes } from "../../context/notesContext";

const CategorySingle = ({ category }) => {
  const { notesState } = useNotes();
  return (
    <li key={category.id}>
      <div className="card bg-base-100 w-full h-full shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{category.title}</h2>
          <p className="">
               {category.description}.
              </p>
          <div className="card-actions justify-end">
            {category.ownerId === notesState.userData.user.id ? (
              <button className="btn btn-primary">edit</button>
            ) : (
              <p className="text-sm">
                You can NOT edit or delete this category because it is owned by an
                user (id: {category.ownerId}).
              </p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default CategorySingle;
