import { NavLink } from "react-router-dom";
import { useNotes } from "../../context/notesContext";

const Header = () => {
  const { notesState, notesDispatch } = useNotes();

  return (
    <header className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <NavLink to="/" className="btn btn-ghost text-xl">
          NotesApp
        </NavLink>
      </div>
      <nav className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">home</NavLink>
          </li>
          {notesState.userData.token && (
            <li>
              <NavLink to="/notes/add">note add</NavLink>
            </li>
          )}
          {notesState.userData.token && (
            <li>
              <NavLink to="/categories">categories</NavLink>
            </li>
          )}
          <li>
            <details>
              <summary>user</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                {!notesState.userData.token && (
                  <>
                    <li>
                      <NavLink to="/signup">signup</NavLink>
                    </li>
                    <li>
                      <NavLink to="/login">login</NavLink>
                    </li>
                  </>
                )}

                {notesState.userData.token && (
                  <li>
                    <NavLink to="/logout">logout</NavLink>
                  </li>
                )}
              </ul>
            </details>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
